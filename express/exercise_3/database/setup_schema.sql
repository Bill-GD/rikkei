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
  interests  text          not null,
  foreign key (company_id) references company (id),
  foreign key (address_id) references address (id)
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
create procedure if not exists reset_auto_increment(in name_of_table varchar(30))
begin
  declare valid int default 0;

  select count(*)
  into valid
  from information_schema.tables
  where table_name = name_of_table and table_schema = database();

  if valid > 0 then
    set @query_str = concat('select coalesce(max(id), 0) into @current_max from ', name_of_table);
    prepare stmt from @query_str;
    execute stmt;
    deallocate prepare stmt;

    set @current_max = @current_max + 1;
    set @query_str = concat('alter table ', name_of_table, ' auto_increment = ', @current_max);
    prepare stmt from @query_str;
    execute stmt;
    deallocate prepare stmt;
  else
    signal sqlstate '45000' set message_text = 'Invalid table name';
  end if;
end $$
delimiter ;

delimiter $$
create procedure if not exists get_page_of(
  in name_of_table varchar(30),
  in page_number int,
  in page_size int)
begin
  declare offsetValue int default page_size * (page_number - 1);
  declare valid int default 0;

  select count(*)
  into valid
  from information_schema.tables
  where table_name = name_of_table and table_schema = database();

  if valid > 0 then
    set @query_str = concat('select * from ', name_of_table, ' limit ', page_size, ' offset ', offsetValue);
    prepare stmt from @query_str;
    execute stmt;
    deallocate prepare stmt;
  else
    signal sqlstate '45000' set message_text = 'Invalid table name';
  end if;
end $$
delimiter ;
