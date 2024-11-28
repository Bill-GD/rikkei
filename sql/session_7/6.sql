use inventorymanagement;

create table ProductRestock (
  restockID   int primary key auto_increment,
  productID   int not null,
  restockDate datetime,
  foreign key (productID) references products (productID)
);

create trigger AfterProductUpdateRestock
  after update
  on products
  for each row
begin
  if old.quantity != new.quantity and new.quantity < 10 then
    insert into ProductRestock (productID, restockDate) values (new.ProductID, now());
  end if;
end;

select *
from ProductRestock;

select *
from products;

update products
set Quantity = 8
where ProductID = 1;
