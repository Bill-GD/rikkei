use InventoryManagement;

create trigger BeforeProductDelete
  before delete
  on products
  for each row
begin
  if old.quantity > 10 then
    signal sqlstate '45000' set message_text = 'This product has more than 10 items. Cancelled deletion.';
  end if;
end;

delete from products where ProductID = 2;
