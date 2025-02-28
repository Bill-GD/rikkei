create database if not exists express_exercise_5_knex;
use express_exercise_5_knex;

create table product (
  product_id   int primary key auto_increment,
  product_name varchar(100) not null,
  status       int          not null
);

create table comment (
  comment_id int primary key auto_increment,
  content    text not null,
  product_id int  not null,
  foreign key (product_id) references product (product_id) on delete cascade
);

create table tag (
  tag_id int primary key auto_increment,
  name   varchar(20) not null
);

create table listing (
  description text not null,
  price       int  not null,
  rate        int  not null,
  product_id  int  not null,
  foreign key (product_id) references product (product_id)
);

create table product_tag (
  product_id int not null,
  tag_id     int not null,
  primary key (product_id, tag_id),
  foreign key (product_id) references product (product_id),
  foreign key (tag_id) references tag (tag_id) on delete cascade
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
