create database if not exists express_session_3;
use express_session_3;

create table if not exists user (
  id       int primary key auto_increment,
  email    varchar(50) not null,
  username varchar(50) not null,
  password varchar(50) not null
  );

select *
from user;
