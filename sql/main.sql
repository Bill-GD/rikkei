create database if not exists new_schema;
use new_schema;

create table if not exists person (
  `id`      int primary key auto_increment,
  `name`    nvarchar(50) not null,
  `age`     int          not null default 0,
  check (`age` > 0),
  `address` nvarchar(50) not null
);

alter table person
  add column `email` nvarchar(50) not null;
alter table person
  drop column `email`;
