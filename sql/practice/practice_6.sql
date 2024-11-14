create database ecommerce;
use ecommerce;

create table if not exists Customers (
  CustomerID   int primary key,
  CustomerName varchar(50),
  ContactName  varchar(50),
  Country      varchar(50)
);

create table if not exists Orders (
  OrderID     int primary key,
  CustomerID  int,
  OrderDate   date,
  TotalAmount decimal(10, 2),
  foreign key (CustomerID) references Customers (CustomerID)# on delete cascade
);

create table if not exists Products (
  ProductID   int primary key,
  ProductName varchar(50),
  Price       decimal(10, 2)
);

create table if not exists OrderDetails (
  OrderDetailID int primary key,
  OrderID       int not null,
  ProductID     int not null,
  Quantity      int not null,
  UnitPrice     decimal(10, 5),
  foreign key (OrderID) references Orders (OrderID),
  foreign key (ProductID) references Products (ProductID)
);

create view order_info as
select c.CustomerName, o.*
from Orders o
       inner join Customers C on o.CustomerID = C.CustomerID;

create view order_detail as
select c.CustomerName, o.*, p.ProductName
from Orders o
       inner join Customers C on o.CustomerID = C.CustomerID
       inner join OrderDetails OD on o.OrderID = OD.OrderID
       inner join Products P on OD.ProductID = P.ProductID;

create view orders as
select *
from Orders;

create view order_details as
select *
from OrderDetails;
