create table if not exists customer (
  customer_id int primary key auto_increment,
  name        nvarchar(50) not null,
  address     nvarchar(50) not null,
  phone       nvarchar(10) not null
);

create table if not exists car (
  car_id int primary key auto_increment,
  name   nvarchar(50) not null,
  type   nvarchar(16) not null,
  cost   int          not null
);

create table if not exists rental (
  rental_id   int primary key auto_increment,
  customer_id int,
  car_id      int,
  start       date not null,
  end         date not null,
  cost        int  not null,
  foreign key (customer_id) references customer (customer_id),
  foreign key (car_id) references car (car_id)
);
