create table if not exists customers (
  customerID int primary key auto_increment,
  firstName  varchar(50),
  lastName   varchar(50),
  email      varchar(100)
);

create table if not exists products (
  productID   int primary key auto_increment,
  productName varchar(100),
  price       decimal(10, 2)
);

create table if not exists orders (
  orderID     int primary key auto_increment,
  customerID  int            not null,
  orderDate   datetime,
  totalAmount decimal(10, 2) not null,
  foreign key (customerID) references customers (customerID)
);

create table if not exists orderItems (
  orderItemID int primary key auto_increment,
  orderID     int not null,
  productID   int not null,
  quantity    int,
  price       decimal(10, 2),
  foreign key (orderID) references orders (orderID),
  foreign key (productID) references products (productID)
);

create index `idx_orderID` on orderItems (orderID);
