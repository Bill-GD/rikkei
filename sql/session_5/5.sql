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

# Hãy tạo view CustomerOrderSummary để hiển thị:
# CustomerID
# CustomerName (tên đầy đủ của khách hàng)
# TotalOrders (số lượng đơn hàng của khách hàng)
# TotalAmountSpent (tổng số tiền đã chi tiêu)
# Truy vấn từ view CustomerOrderSummary để tìm các khách hàng có tổng số tiền chi tiêu trên 5000

create view CustomerOrderSummary as
select c.CustomerID,
       concat(firstName, lastName) CustomerName,
       count(o.*)                  TotalOrders,
       sum(TotalAmount)            TotalAmountSpent
from customers c
       inner join orders o on c.customerID = o.customerID
group by c.customerID;

create index `idx_TotalAmountSpent` on CustomerOrderSummary (TotalAmountSpent);

select CustomerID, CustomerName
from CustomerOrderSummary
where TotalAmountSpent > 5000;
