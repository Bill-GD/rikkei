create database if not exists express_exercise_5;
use express_exercise_5;

create table product (
  product_id   int          not null,
  product_name varchar(100) not null,
  status       int          not null default true,
  primary key (product_id)
);

create table comment (
  comment_id int  not null,
  content    text not null,
  product_id int  not null,
  primary key (comment_id),
  foreign key (product_id) references product (product_id)
);

create table tag (
  tag_id int         not null,
  name   varchar(20) not null,
  primary key (tag_id)
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
  foreign key (tag_id) references tag (tag_id)
);
