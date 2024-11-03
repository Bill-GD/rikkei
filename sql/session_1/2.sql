create table if not exists author (
  author_id int primary key auto_increment,
  `name`    nvarchar(100) not null
);

create table if not exists publisher (
  publisher_id int auto_increment,
  `name`       nvarchar(50) not null
);

create table if not exists book (
  book_id      int primary key auto_increment,
  publisher_id int,
  author_id    int,
  `name`       nvarchar(100) not null,
  `year`       int           not null,
  constraint foreign key (publisher_id) references publisher (publisher_id) on delete cascade,
  constraint foreign key (author_id) references author (author_id) on delete cascade
);
