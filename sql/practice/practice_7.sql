create database if not exists SalesDB;
use SalesDB;

# drop database SalesDB;

create table if not exists Customers (
  CustomerID int primary key auto_increment,
  FirstName  varchar(50)  not null,
  LastName   varchar(50)  not null,
  Email      varchar(100) not null
);

create table if not exists Products (
  ProductID   int primary key auto_increment,
  ProductName varchar(100)   not null,
  Price       decimal(10, 2) not null
);

create table if not exists Orders (
  OrderID     int primary key auto_increment,
  CustomerID  int            not null,
  OrderDate   date           not null,
  TotalAmount decimal(10, 2) not null,
  foreign key (CustomerID) references Customers (CustomerID)
);

create table if not exists Promotions (
  PromotionID        int primary key auto_increment,
  PromotionName      varchar(100)  not null,
  DiscountPercentage decimal(5, 2) not null
);

create table if not exists Sales (
  SaleID     int primary key auto_increment,
  OrderID    int            not null,
  SaleDate   date           not null,
  SaleAmount decimal(10, 2) not null,
  foreign key (OrderID) references Orders (OrderID)
);

insert into Customers (FirstName, LastName, Email)
values ('John', 'Doe', 'john.doe@example.com'),
       ('Jane', 'Smith', 'jane.smith@example.com'),
       ('Alice', 'Johnson', 'alice.johnson@example.com'),
       ('Bob', 'Brown', 'bob.brown@example.com'),
       ('Charlie', 'Davis', 'charlie.davis@example.com'),
       ('Eve', 'Miller', 'eve.miller@example.com');

insert into Products (ProductName, Price)
values ('Product A', 10.00),
       ('Product B', 20.00),
       ('Product C', 30.00),
       ('Product D', 40.00),
       ('Product E', 50.00),
       ('Product F', 60.00),
       ('Product G', 70.00),
       ('Product H', 80.00),
       ('Product I', 90.00),
       ('Product J', 100.00);

insert into Orders (CustomerID, OrderDate, TotalAmount)
values (1, '2024-06-01', 1500.00),
       (2, '2024-06-15', 2700.00),
       (3, '2024-07-03', 3760.00),
       (4, '2024-07-20', 540.00),
       (5, '2024-08-05', 3500.00),
       (6, '2024-08-25', 600.00),
       (1, '2024-09-07', 1450.00),
       (2, '2024-09-18', 800.00),
       (3, '2024-09-09', 2500.00),
       (4, '2024-09-30', 1000.00);

insert into Sales (OrderID, SaleDate, SaleAmount)
values (1, '2024-06-01', 1500.00),
       (2, '2024-06-15', 2700.00),
       (3, '2024-07-03', 3760.00),
       (4, '2024-07-20', 450.00),
       (5, '2024-08-05', 3500.00),
       (6, '2024-08-25', 600.00),
       (7, '2024-09-07', 1450.00),
       (8, '2024-09-18', 800.00),
       (9, '2024-09-09', 2500.00),
       (10, '2024-09-30', 1000.00);

# insert into Promotions (PromotionName, DiscountPercentage)
# values ('Promo A', 5.00),
#        ('Promo B', 10.00),
#        ('Promo C', 15.00),
#        ('Promo D', 20.00),
#        ('Promo E', 25.00),
#        ('Promo F', 30.00),
#        ('Promo G', 35.00),
#        ('Promo H', 40.00),
#        ('Promo I', 45.00),
#        ('Promo J', 50.00);

delimiter $$
create procedure if not exists CalculateMonthlyRevenueAndApplyPromotion(in monthYear varchar(7), in revenueThreshold decimal(10, 2))
begin
  declare overCount int default 0;
  declare counter int default overCount;

  select count(*)
  into overCount
  from (select c.CustomerID, sum(o.TotalAmount) sum
        from Orders o
               inner join Customers c on o.CustomerID = c.CustomerID
        where o.OrderDate like concat(monthYear, '%')
        group by c.CustomerID
        having sum > revenueThreshold) t;

  while counter < overCount
    do
      insert into Promotions (PromotionName, DiscountPercentage)
      values (concat(cast(revenueThreshold as char), '_', cast(counter as char)), rand(revenueThreshold));
      set counter = counter + 1;
    end while;
end $$
delimiter ;

call CalculateMonthlyRevenueAndApplyPromotion('2024-07', 150);

select *
from Promotions;
