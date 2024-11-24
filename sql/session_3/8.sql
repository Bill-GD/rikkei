create table if not exists invoices (
  invoiceID    int primary key auto_increment,
  invoiceDate  datetime,
  customerName varchar(100) not null
);

create table if not exists products (
  productID   int primary key auto_increment,
  productName varchar(100)   not null,
  price       decimal(10, 2) not null
);

create table if not exists invoiceDetails (
  detailID  int primary key auto_increment,
  invoiceID int            not null,
  productID int            not null,
  quantity  int            not null,
  price     decimal(10, 2) not null,
  foreign key (invoiceID) references invoices (invoiceID),
  foreign key (productID) references products (productID)
);

# Update:
# Cập nhật giá của sản phẩm có ProductID = 1 thành 55.00.
# Cập nhật số lượng sản phẩm trong chi tiết hóa đơn có DetailID = 2 thành 10.
# Delete:
# Xóa sản phẩm với ProductID = 3 khỏi bảng Products.
# Xóa chi tiết hóa đơn với DetailID = 1 khỏi bảng InvoiceDetails.
# Truy Vấn:
# Viết truy vấn để lấy tổng giá trị hóa đơn (giá * số lượng) của từng hóa đơn.
# Viết truy vấn để lấy danh sách tất cả sản phẩm trong từng hóa đơn cùng với số lượng và giá.

update products
set price = 55.00
where productID = 1;

update invoiceDetails
set quantity = 10
where detailID = 2;

delete
from products
where productID = 3;
delete

from invoiceDetails
where detailID = 1;

select i.invoiceID, sum(price * quantity) totalValue
from invoices i
       inner join invoiceDetails id on i.invoiceID = id.invoiceID
group by invoiceID;

select i.invoiceID, productName, quantity, p.price
from invoices i
       inner join invoiceDetails id on i.invoiceID = id.invoiceID
       inner join products p on iD.productID = p.productID;
