create database InventoryManagement;
use InventoryManagement;

create table Products (
  ProductID   int primary key auto_increment,
  ProductName varchar(100),
  Quantity    int
);

create table InventoryChanges (
  ChangeID    int primary key auto_increment,
  ProductID   int,
  OldQuantity int,
  NewQuantity int,
  ChangeDate  datetime,
  foreign key (ProductID) references Products (ProductID)
);

create trigger AfterProductUpdate
  after update
  on Products
  for each row
begin
  insert into InventoryChanges (ProductID, OldQuantity, NewQuantity, ChangeDate)
  values (old.ProductID, old.Quantity, new.Quantity, now());
end;

select *
from Products;

select *
from InventoryChanges;

insert into Products (ProductName, Quantity)
values ('Store A', 10),
       ('Store B', 20),
       ('Store C', 30);

update Products
set Quantity = 18
where ProductID = 2;
