use shopee_fake;

# 3
# all product info
select *
from products p
       inner join stores s on s.storeId = p.storeId
       inner join categories c on p.categoryId = c.categoryId
       inner join order_details od on p.productId = od.productId;

# orders with total price > 500k
select *
from orders
where totalPrice > 500000;

# name, address of all stores
select storeName, addressStore
from stores;

# users have email with '@gmail.com'
select *
from users
where email like '%@gmail.com';

# reviews with rate of 5
select *
from reviews
where rate = 5;

# products with quantity < 10
select *
from products
where quantity < 10;

# products of category 1
select *
from products p
       inner join categories c on p.categoryId = c.categoryId
where c.categoryId = 1;

# user count
select count(*) userCount
from users;

# total cost of all orders
select sum(totalPrice) totalProductPrice
from orders;

# product with max price
select *
from products
order by price desc
limit 1;

# stores that are running (status = 1)
select *
from stores
where statusstore = 1;

# product count of each category
select c.categoryName, count(*) productCount
from products p
       inner join categories c on p.categoryId = c.categoryId
group by c.categoryId;

# products with no review
select *
from products
where productId not in (select distinct productId from reviews);

# select sold count of each product
select p.productName, sum(quantityOrder) orderCount
from order_details o
       inner join products p on o.productId = p.productId
group by p.productId;

# users with no order
select *
from users
where userId not in (select distinct userId from orders);

# name, order count of stores
select s.storeName, count(*) orderCount
from stores s
       inner join orders o on s.storeId = o.storeId
group by s.storeId;

# products info & image count
select p.productName, count(*) imageCount
from products p
       inner join images i on p.productId = i.productId
group by p.productId;

# review count, review average of products
select p.productName, count(*) reviewCount, avg(r.rate) averageRating
from reviews r
       inner join products p on r.productId = p.productId
group by p.productId;

# user with max review count
select u.userName, count(*) reviewCount
from reviews r
       inner join users u on r.userId = u.userId
group by u.userId
order by reviewCount desc
limit 1;

# top 3 best selling products
select *
from products
order by quantitySold desc
limit 3;

# best selling product at store with id 'S001'
select *
from products p
       inner join stores s on p.storeId = s.storeId
where s.storeId = 'S001'
order by p.quantitySold desc
limit 1;

# products with stored value (price * stored quantity) > 1 mil
select productName, (price * quantity) storedValue
from products
where (price * quantity) > 1000000;
# order by storedValue desc
# limit 1;

# stores with max revenue
select s.storeName, sum(o.totalPrice) totalRevenue
from orders o
       inner join stores s on o.storeId = s.storeId
group by s.storeId
order by totalRevenue desc
limit 1;

# users & their total expenditure
select u.userName, sum(o.totalPrice) expenditure
from orders o
       inner join users u on o.userId = u.userId
group by u.userId;

# order with max price
select *
from orders
order by totalPrice desc
limit 1;

# average product sold count of orders
select orderId, avg(orderTotal) averageProductCount
from (select orderId, sum(quantityOrder) orderTotal from order_details group by orderId) t;

# name, cart count of products
select p.productName, count(c.productId) timesAddedToCart
from carts c
       right join products p on c.productId = p.productId
group by p.productId;

# products sold and stored 0
select productName, quantity, quantitySold
from products
where quantitySold > 0
  and quantity <= 0;

# orders by 'duong@gmail.com'
select o.*
from orders o
       inner join users u on o.userId = u.userId
where u.email = 'duong@gmail.com';

# stores & total quantity of owned products
select s.storeName, sum(p.quantity) totalQuantity
from stores s
       inner join products p on s.storeId = p.storeId
group by s.storeId;

# 4

# view expensive_products: name, price of products with price > 500k

create view expensive_products as
select productName, price
from products
where price > 500000;

select *
from expensive_products;

update expensive_products
set price = 600000
where productName = 'Product A';

# alter view expensive_products as
#   select productName, price
#   from products
#   where price > 600000;

drop view expensive_products;

create view products_category as
select p.productName, c.categoryName
from products p
       inner join categories c on p.categoryId = c.categoryId;

# 5
# index on products (productName)
create index idx_product_name on products (productName);
show indexes from products;
drop index idx_product_name on products;

delimiter $$
create procedure if not exists getProductByPrice(in priceInput int)
begin
  select * from products where price > priceInput;
end;
delimiter ;

call getProductByPrice(500000);

delimiter $$
create procedure if not exists getOrderDetails(in orderId nvarchar(255))
begin
  select * from order_details od where od.orderId = orderId;
end;
delimiter ;

call getOrderDetails('2138fb41-3094-4136-ba54-7ee3f9eb8ca1');

drop procedure getOrderDetails;

delimiter $$
create procedure if not exists addNewProduct(
  in productNameParam nvarchar(255),
  in priceParam int,
  in descriptionParam longtext,
  in quantityParam int
)
begin
  insert into products (productName, price, description, quantity)
  values (productNameParam, priceParam, descriptionParam, quantityParam);
end $$
delimiter ;

delimiter $$
create procedure if not exists deleteProductById(in productId varchar(255))
begin
  delete from products p where p.productId = productId;
end $$
delimiter ;

delimiter $$
create procedure if not exists searchProductByName(in name nvarchar(255))
begin
  select * from products where productName like concat('%', name, '%');
end $$
delimiter ;

call searchProductByName('Loa');

delimiter $$
create procedure if not exists filterProductsByPriceRange(in minPrice int, in maxPrice int)
begin
  select * from products where price between minPrice and maxPrice;
end $$
delimiter ;

call filterProductsByPriceRange(10000, 15000);

delimiter $$
create procedure if not exists paginateProducts(in pageNumber int, in pageSize int)
begin
  declare offsetValue int default pageSize * (pageNumber - 1);
  select * from products limit pageSize offset offsetValue;
end $$
delimiter ;

call paginateProducts(2, 4);
