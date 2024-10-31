create table if not exists customer (
  customer_id int primary key auto_increment,
  `name` nvarchar(50) not null,
  address text not null,
  email nvarchar(50) not null
);

create table if not exists product (
  product_id int primary key auto_increment,
  `name` nvarchar(50) not null,
  cost int not null
);

create table if not exists `order` (
  order_id int primary key auto_increment,
  customer_id int not null,
  `date` datetime not null,
  cost int not null,
  constraint foreign key (customer_id) references customer (customer_id) on delete cascade
);

create table if not exists ordered_product (
  product_id int not null,
  order_id int not null,
  constraint foreign key (product_id) references product (product_id) on delete cascade,
  constraint foreign key (order_id) references `order` (order_id) on delete cascade
);
