create table if not exists Customers (
  CustomerID int primary key auto_increment,
  FirstName  varchar(50)  not null,
  LastName   varchar(50)  not null,
  Email      varchar(100) not null
);

create table if not exists Promotions (
  PromotionID        int primary key auto_increment,
  PromotionName      varchar(100) not null,
  DiscountPercentage decimal(5, 2)
);

create table if not exists Products (
  ProductID   int primary key auto_increment,
  ProductName varchar(100)   not null,
  Price       decimal(10, 2) not null,
  PromotionID int,
  foreign key (PromotionID) references Promotions (PromotionID)
);

create table if not exists Orders (
  OrderID     int primary key auto_increment,
  CustomerID  int,
  OrderDate   datetime,
  TotalAmount decimal(10, 2) not null,
  foreign key (CustomerID) references Customers (CustomerID)
);

create table if not exists OrderDetails (
  OrderDetailID int primary key auto_increment,
  OrderID       int,
  ProductID     int,
  Quantity      int            not null,
  Price         decimal(10, 2) not null,
  foreign key (OrderID) references Orders (OrderID),
  foreign key (ProductID) references Products (ProductID)
);

create table if not exists Sales (
  SaleID     int primary key auto_increment,
  OrderID    int,
  SaleDate   date,
  SaleAmount decimal(10, 2) not null,
  foreign key (OrderID) references Orders (OrderID)
);

delimiter $$
create procedure if not exists GetCustomerTotalRevenue(in inCustomerID int, in inStartDate date, in inEndDate date)
begin
  select sum(TotalAmount) Total
  from Customers c
         inner join Orders o on c.CustomerID = o.CustomerID
  where OrderDate between inStartDate and inEndDate
    and c.CustomerID = inCustomerID;
end $$
delimiter ;
