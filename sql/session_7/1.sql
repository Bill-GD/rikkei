create database InventoryManagement;
use InventoryManagement;

create table products (
  productID   int primary key auto_increment,
  productName varchar(100),
  quantity    int
);

create table inventoryChanges (
  changeID    int primary key auto_increment,
  productID   int,
  oldQuantity int,
  newQuantity int,
  changeDate  datetime,
  foreign key (productID) references products (productID)
);

create trigger AfterProductUpdate
  after update
  on products
  for each row
begin
  if old.quantity != new.quantity then
    insert into inventoryChanges (productID, oldQuantity, newQuantity, changeDate)
    values (old.productID, old.quantity, new.quantity, now());
  end if;
end;

select *
from products;

select *
from inventoryChanges;

insert into products (productName, quantity)
values ('Store A', 10),
       ('Store B', 20),
       ('Store C', 30);

update products
set quantity = 18
where productID = 2;
