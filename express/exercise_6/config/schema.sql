create database if not exists book_store;
use book_store;

create table if not exists author (
  author_id int primary key,
  name      varchar(255) not null
);

create table if not exists category (
  category_id  int primary key,
  category_name varchar(255) not null
);

create table if not exists book (
  book_id     int primary key,
  title       varchar(255) not null,
  author_id   int,
  category_id int,
  price       decimal(5, 2),
  rate        decimal(2, 1),
  foreign key (author_id) references author (author_id),
  foreign key (category_id) references category (category_id)
);

create table if not exists review (
  review_id int primary key,
  book_id   int,
  content   text,
  foreign key (book_id) references book (book_id)
);

insert into author (author_id, name)
values (1, 'F. Scott Fitzgerald'),
       (2, 'James Clear'),
       (3, 'J.K. Rowling'),
       (4, 'Yuval Noah Harari'),
       (5, 'Mark Manson');

insert into category (category_id, category_name)
values (1, 'Classic Literature'),
       (2, 'Self-Help'),
       (3, 'Fantasy'),
       (4, 'History');

insert into book (book_id, title, author_id, category_id, price, rate)
values (1, 'The Great Gatsby', 1, 1, 15.99, 4.8),
       (2, 'Atomic Habits', 2, 2, 22.50, 4.7),
       (3, 'Harry Potter and the Sorcerer\'s Stone', 3, 3, 12.99, 4.9),
       (4, 'Sapiens: A Brief History of Humankind', 4, 4, 19.99, 4.8),
       (5, 'The Subtle Art of Not Giving a F\*ck', 5, 2, 18.00, 4.6),
       (6, 'Harry Potter and the Chamber of Secrets', 3, 3, 14.50, 4.8),
       (7, 'The Psychology of Money', 2, 2, 20.00, 4.7),
       (8, 'Homo Deus: A Brief History of Tomorrow', 4, 4, 21.99, 4.9);

insert into review (review_id, book_id, content)
values (1, 1, 'A masterpiece of literature!'),
       (2, 1, 'Great read, highly recommended.'),
       (3, 2, 'Life-changing insights!'),
       (4, 2, 'Practical and effective advice.');
