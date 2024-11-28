use InventoryManagement;

create table if not exists InventoryChangeHistory (
  historyID   int primary key auto_increment,
  productID   int not null,
  oldQuantity int,
  newQuantity int,
  changeType  enum ('increase', 'decrease'),
  changeDate  datetime,
  foreign key (productID) references products (productID)
);

create trigger AfterProductUpdateHistory
  after update
  on products
  for each row
begin
  declare typeStr varchar(10) default (if(new.Quantity > old.quantity, 'increase', 'decrease'));
  if old.quantity != new.quantity then
    insert into InventoryChangeHistory (productID, oldQuantity, newQuantity, changeType, changeDate)
    values (old.ProductID, old.Quantity, new.Quantity, typeStr, now());
  end if;
end;

select *
from InventoryChangeHistory;

update products
set quantity = 21
where ProductID = 3;
