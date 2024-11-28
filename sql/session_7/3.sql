use InventoryManagement;

alter table products
  add column LastUpdated datetime;

create trigger ProductUpdateSetDate
  before update
  on products
  for each row
begin
  set new.LastUpdated = now();
end;

show triggers;

drop trigger ProductUpdateSetDate;

select *
from products;

select *
from inventorychanges;

update products
set Quantity = 11
where ProductID = 2;

update products
set ProductName = 'Product B'
where ProductID = 2;
