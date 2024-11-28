use InventoryManagement;

create table ProductSummary (
  SummaryID     int primary key auto_increment,
  TotalQuantity int
);

set @totalQuantity = (select sum(quantity)
                      from products);

insert into ProductSummary (SummaryID, TotalQuantity)
values (1, @totalQuantity);

select *
from ProductSummary;

create trigger AfterProductUpdateSummary
  after update
  on products
  for each row
begin
  if old.quantity != new.quantity then
    update productsummary set TotalQuantity = (select sum(quantity) from products);
  end if;
end;
