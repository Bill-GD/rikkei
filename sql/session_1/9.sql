create database if not exists StoreManagement;
use StoreManagement;

create table if not exists Stores (
  StoreID   int primary key auto_increment,
  StoreName nvarchar(255) not null
);

create table if not exists Customers (
  CustomerID   int primary key auto_increment,
  CustomerName nvarchar(255) not null
);

create table if not exists Sales (
  SaleID      int primary key auto_increment,
  SaleDate    date not null,
  StoreID     int  not null,
  CustomerID  int  not null,
  TotalAmount int  not null,
  foreign key (StoreID) references Stores (StoreID),
  foreign key (CustomerID) references Customers (CustomerID)
);

create table if not exists Products (
  ProductID   int primary key auto_increment,
  ProductName nvarchar(50)
);

create table if not exists SalesDetails (
  SaleDetailID int primary key auto_increment,
  SaleID       int not null,
  ProductID    int not null,
  Quantity     int not null,
  UnitPrice    int not null,
  foreign key (SaleID) references Sales (SaleID),
  foreign key (ProductID) references Products (ProductID)
);

insert into Stores (StoreName)
values ('Store A'),
       ('Store B'),
       ('Store C');

insert into Customers (CustomerName)
values ('Customer 1'),
       ('Customer 2'),
       ('Customer 3');

insert into Sales (SaleDate, StoreID, CustomerID, TotalAmount)
values ('2023-01-01', 1, 1, 8200),
       ('2023-01-02', 2, 2, 20600),
       ('2023-01-03', 3, 1, 5400),
       ('2023-01-01', 1, 1, 52600),
       ('2023-01-08', 2, 2, 13400),
       ('2023-01-13', 1, 3, 17100);

insert into Products (ProductName)
values ('Product 1'),
       ('Product 2'),
       ('Product 3');

insert into SalesDetails (SaleID, ProductID, Quantity, UnitPrice)
values (1, 1, 2, 3300),
       (1, 2, 1, 1600),
       (2, 2, 4, 2900),
       (2, 3, 2, 4500),
       (3, 1, 1, 5400),
       (4, 2, 4, 5400),
       (4, 1, 5, 6200),
       (5, 1, 5, 1700),
       (5, 3, 1, 4900),
       (6, 3, 3, 5700);

select st.StoreName, sum(sd.Quantity * sd.UnitPrice) as Total
from Stores as st,
     Sales as s,
     SalesDetails as sd
where st.StoreID = s.StoreID
  and s.SaleID = sd.SaleID
group by st.StoreID;

select pr.StoreID, p.ProductID, p.ProductName, (pr.PerStore / ps.StoreTotal) as Ratio
from Products as p,
     (
       # revenue per product per store
       select st.StoreID, p.ProductID, (sd.Quantity * sd.UnitPrice) as PerStore
       from Stores as st,
            Sales as s,
            SalesDetails as sd,
            Products as p
       where st.StoreID = s.StoreID
         and s.SaleID = sd.SaleID
         and p.ProductID = sd.ProductID) as pr,
     (
       # total revenue per store
       select st.StoreID, sum(sd.Quantity * sd.UnitPrice) as StoreTotal
       from Stores as st,
            Sales as s,
            SalesDetails as sd
       where st.StoreID = s.StoreID
         and s.SaleID = sd.SaleID
       group by st.StoreID) as ps
where pr.StoreID = ps.StoreID
  and p.ProductID = pr.ProductID;

select cc.CustomerName, cc.OrderCount, sc.TotalSpending
from (
       # customer order count
       select c.CustomerID, c.CustomerName, count(s.SaleID) as OrderCount
       from Sales as s,
            Customers as c
       where s.CustomerID = c.CustomerID
       group by c.CustomerID
       order by OrderCount desc) as cc,
     (
       # spending per customer
       select c.CustomerID, sum(s.TotalAmount) as TotalSpending
       from Sales as s,
            Customers as c
       where s.CustomerID = c.CustomerID
       group by c.CustomerID
       order by TotalSpending desc) as sc
where sc.TotalSpending > 150
  and cc.CustomerID = sc.CustomerID
order by TotalSpending desc;

drop table SalesDetails;
drop table Sales;
drop table Stores;
drop table Customers;
