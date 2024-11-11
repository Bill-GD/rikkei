create database if not exists ecommercedb2;
use ecommercedb2;

create table if not exists `Users` (
  `UserID`       int primary key auto_increment,
  `Username`     varchar(50)         not null,
  `PasswordHash` varchar(255)        not null,
  `Email`        varchar(100) unique not null,
  `CreatedAt`    datetime default current_timestamp
);

create table if not exists `Products` (
  `ProductID`   int primary key auto_increment,
  `ProductName` varchar(100)   not null,
  `Description` text,
  `Price`       decimal(10, 2) not null,
  `Stock`       int            not null
);

create table if not exists `Orders` (
  `OrderID`     int primary key auto_increment,
  `UserID`      int            not null,
  `OrderDate`   datetime default current_timestamp,
  `TotalAmount` decimal(10, 2) not null,
  foreign key (`UserID`) references `Users` (`UserID`)
);

create table if not exists `OrderDetails` (
  `OrderDetailID` int primary key auto_increment,
  `OrderID`       int            not null,
  `ProductID`     int            not null,
  `Quantity`      int            not null,
  `PriceAtOrder`  decimal(10, 2) not null,
  foreign key (`OrderID`) references `Orders` (`OrderID`),
  foreign key (`ProductID`) references `Products` (`ProductID`) on delete cascade
);

create table if not exists `Reviews` (
  `ReviewID`   int primary key auto_increment,
  `ProductID`  int  not null,
  `UserID`     int  not null,
  `Rating`     int check (Rating between 1 and 5),
  `ReviewText` text not null,
  `CreatedAt`  datetime default current_timestamp,
  foreign key (`ProductID`) references Products (ProductID) on delete cascade,
  foreign key (`UserID`) references Users (UserID)
);

# insert
insert into `Users` (UserID, Username, PasswordHash, Email)
values (1, 'username1', 'hashedpassword', 'user1@gmail.com'),
       (2, 'username2', 'hashedpassword', 'user2@gmail.com'),
       (3, 'username3', 'hashedpassword', 'user3@gmail.com');

insert into `Products` (ProductID, ProductName, Description, Price, Stock)
values (1, 'product1', 'Description of product 1', 100000, 12),
       (2, 'product2', 'Description of product 2', 200000, 22),
       (3, 'product3', 'Description of product 3', 300000, 32),
       (4, 'product4', 'Description of product 4', 400000, 42),
       (5, 'product5', 'Description of product 5', 500000, 52);

insert into `Orders` (OrderID, UserID, TotalAmount)
values (1, 1, 1300000),
       (2, 2, 1100000);

insert into `OrderDetails` (OrderDetailID, OrderID, ProductID, Quantity, PriceAtOrder)
values (1, 1, 4, 2, 400000),
       (2, 1, 1, 3, 100000),
       (3, 2, 3, 2, 300000),
       (4, 2, 5, 1, 500000);

insert into `Reviews` (ProductID, UserID, Rating, ReviewText)
values (1, 1, 4, 'Review of product 1 of user 1'),
       (4, 1, 3, 'Review of product 4 of user 1'),
       (5, 2, 3, 'Review of product 5 of user 2');

# update
update `Products`
set Price = 140000
where ProductID = 2;

update `Products`
set Stock = 31
where ProductID = 3;

update `Users`
set Email = 'new_user2@gmail.com'
where UserID = 2;

# delete
# delete
# from `OrderDetails`
# where ProductID = 5;
# delete
# from `Reviews`
# where ProductID = 5; -> already got 'on delete cascade'
delete
from `Products`
where ProductID = 5;

# delete
# from `OrderDetails`
# where OrderID = 2; # -> already got 'on delete cascade'
delete
from `Orders`
where OrderID = 2;
