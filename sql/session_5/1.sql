create table if not exists Customers (
  CustomerID   int primary key auto_increment,
  CustomerName varchar(100) not null,
  Phone        varchar(15),
  Email        varchar(50)  not null,
  CreatedAt    datetime
);

create table if not exists Products (
  ProductID   int primary key auto_increment,
  ProductName varchar(255)   not null,
  Catergory   varchar(255),
  Price       decimal(10, 2) not null
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
  UnitPrice     decimal(10, 2) not null,
  foreign key (OrderID) references Orders (OrderID),
  foreign key (ProductID) references Products (ProductID)
);

create index `idx_Email` on Customers (Email);
create index `idx_OrderDate` on Orders (OrderDate);

create view `view_OrderQuantity` as
select OrderID, sum(Quantity) as TotalQuantity
from OrderDetails
group by OrderID;
