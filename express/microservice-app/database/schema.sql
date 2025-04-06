create database micro_auth_db;
use micro_auth_db;

create table if not exists auth_session (
  userId int  not null,
  token  text not null,
  primary key (userId, token)
);

create database micro_user_db;
use micro_user_db;

create table if not exists user (
  userId   int primary key auto_increment,
#   username nvarchar(100) not null,
  email    varchar(255)  not null,
  password char(60)      not null,
  avatar   text
);

create database micro_course_db;
use micro_course_db;

create table if not exists course (
  courseId    int primary key,
  name        text not null,
  description text not null,
  duration    int,
  created_at  datetime default now()
);

create table if not exists student_course (
  courseId int not null,
  userId   int not null
);
