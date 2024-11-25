create table if not exists customers (
  customerID int primary key auto_increment,
  firstName  varchar(50),
  lastName   varchar(50),
  email      varchar(100)
);

create table if not exists products (
  productID   int primary key auto_increment,
  productName varchar(100),
  price       decimal(10, 2)
);

create table if not exists orders (
  orderID     int primary key auto_increment,
  customerID  int            not null,
  orderDate   datetime,
  totalAmount decimal(10, 2) not null,
  foreign key (customerID) references customers (customerID)
);

create table if not exists orderItems (
  orderItemID int primary key auto_increment,
  orderID     int not null,
  productID   int not null,
  quantity    int,
  price       decimal(10, 2),
  foreign key (orderID) references orders (orderID),
  foreign key (productID) references products (productID)
);

create table if not exists sales (
  saleID     int primary key auto_increment,
  orderID    int not null,
  saleDate   date,
  saleAmount decimal(10, 2),
  foreign key (orderID) references orders (orderID)
);

create view CustomerOrderSummary as
select c.CustomerID,
       concat(c.firstName, c.lastName) CustomerName,
       count(o.*)                      TotalOrders,
       sum(TotalAmount)                TotalAmountSpent
from customers c
       inner join orders o on c.customerID = o.customerID
group by c.CustomerID;

create index `idx_ProductID` on orderItems (productID);

create view ProductRevenueSummary as
select p.ProductID, p.ProductName, sum(quantity) TotalQuantitySold, sum(oi.price) TotalRevenue
from products p
       inner join orderItems oi on p.productID = oi.productID
group by p.ProductID;

select *
from ProductRevenueSummary
where TotalRevenue > 10000
order by TotalRevenue desc;
