create database if not exists module2_project;
use module2_project;

create table if not exists user (
  user_id  int primary key,
  username nvarchar(100) not null,
  email    nvarchar(100) not null,
  password char(60)      not null,
  role     enum ('user', 'admin')
);

create table if not exists post (
  post_id      int primary key,
  uploader_id  int  not null,
  content      text not null,
  image_path   text     default null,
  like_count   int      default 0,
  date_created datetime default current_timestamp,
  foreign key (uploader_id) references user (user_id)
);

create table if not exists comment (
  comment_id  int primary key,
  post_id     int  not null,
  uploader_id int  not null,
  content     text not null,
  foreign key (post_id) references post (post_id),
  foreign key (uploader_id) references user (user_id)
);

delimiter $$
create procedure if not exists likePost(in id int)
begin
  update post set like_count = like_count + 1 where post_id = id;
end $$
delimiter ;

delimiter $$
create procedure if not exists deleteUser(in userId int)
begin
  delete from comment where uploader_id = userId;
  delete from post where uploader_id = userId;
  delete from user where user_id = userId;
end $$
delimiter ;
