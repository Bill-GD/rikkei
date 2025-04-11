create database if not exists module2_project;
use module2_project;

create table if not exists user (
  user_id  int primary key,
  username nvarchar(100) not null,
  email    nvarchar(100) not null,
  password char(60)      not null,
  role     enum ('user', 'admin')
);

