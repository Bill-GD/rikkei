create database if not exists express_exercise_3;
use express_exercise_3;

create table if not exists company (
  id          int primary key auto_increment,
  name        nvarchar(50) not null,
  catchphrase nvarchar(50),
  business    nvarchar(50) not null
);

create table if not exists address (
  id      int primary key auto_increment,
  street  nvarchar(50) not null,
  suite   nvarchar(50),
  city    nvarchar(50) not null,
  zipcode nvarchar(20) not null,
  lat     decimal(7, 4),
  lng     decimal(7, 4)
);

create table if not exists user (
  id         int primary key auto_increment,
  name       nvarchar(50)  not null,
  username   nvarchar(50)  not null,
  email      nvarchar(100) not null,
  phone      varchar(35)   not null,
  website    varchar(20)   not null,
  company_id int           not null,
  address_id int           not null,
  foreign key (company_id) references company (id),
  foreign key (address_id) references address (id)
);

create table if not exists interest (
  id   int primary key auto_increment,
  name nvarchar(50) not null unique
);

create table if not exists user_interest (
  user_id     int not null,
  interest_id int not null,
  primary key (user_id, interest_id),
  foreign key (user_id) references user (id),
  foreign key (interest_id) references interest (id)
);

create table if not exists album (
  id      int primary key auto_increment,
  user_id int           not null,
  title   nvarchar(100) not null,
  foreign key (user_id) references user (id)
);

create table if not exists photo (
  id        int primary key auto_increment,
  album_id  int           not null,
  title     nvarchar(100) not null,
  url       varchar(100)  not null,
  thumbnail varchar(100)  not null,
  foreign key (album_id) references album (id)
);

delimiter $$
create procedure if not exists reset_auto_increment(in table_name enum ('company', 'address', 'user', 'interest', 'album', 'photo'))
begin
  declare current_max int default 1;
  declare query_str varchar(100);

  set query_str = concat('select max(id) into current_max from ', table_name);
  prepare stmt from @query_str;
  execute stmt;
  deallocate prepare stmt;

  set query_str = concat('alter table ', table_name, ' auto_increment = ', current_max + 1);
  prepare stmt from @query_str;
  execute stmt;
  deallocate prepare stmt;
end $$
delimiter ;

delimiter $$
create procedure if not exists get_page_of(
  in table_name enum ('company', 'address', 'user', 'interest', 'album', 'photo'),
  in page_number int,
  in page_size int)
begin
  declare offsetValue int default page_size * (page_number - 1);
  declare query_str varchar(100);

  set query_str = concat('select * from ', table_name, ' limit ', page_size, ' offset ', offsetValue);
  prepare stmt from @query_str;
  execute stmt;
  deallocate prepare stmt;
end $$
delimiter ;
