create database programming_courses;
use programming_courses;

# create table if not exists level (
#   levelId int primary key,
#   title   varchar(50) not null
# );

create table if not exists user (
  userId   int primary key,
  name     nvarchar(255) not null,
  email    varchar(255)  not null,
  password nchar(60)     not null,
  avatar   text
);

create table if not exists course (
  courseId    int primary key,
  title       nvarchar(255) not null,
  description nvarchar(255) not null,
  duration    time          not null,
  level       varchar(30)   not null,
  price       int           not null,
  rating      decimal(2, 1) not null,
  constraint positive_price check (price > 0),
  constraint rating_range check (rating between 1 and 5)
);

create table if not exists instructor (
  instructorId int primary key,
  name         nvarchar(100) not null,
  avatar       text          not null
);

create table if not exists category (
  categoryId int primary key,
  category   varchar(100) not null
);

create table if not exists course_category (
  courseId   int not null,
  categoryId int not null,
  foreign key (courseId) references course (courseId),
  foreign key (categoryId) references category (categoryId)
);

create table if not exists lesson (
  lessonId int primary key,
  lesson   nvarchar(255) not null
);

create table if not exists course_lesson (
  courseId int not null,
  lessonId int not null,
  foreign key (courseId) references course (courseId),
  foreign key (lessonId) references lesson (lessonId)
);

insert into instructor (instructorId, name, avatar)
values (1, 'Nguyễn Văn A', 'https://example.com/avatar1.png'),
       (2, 'Trần Thị B', 'https://example.com/avatar2.png'),
       (3, 'Phạm Văn C', 'https://example.com/avatar3.png');

insert into course (courseId, title, description, duration, level, price, rating)
values (1001, 'Lập trình Python cho người mới bắt đầu', 'Học từ cơ bản đến OOP, thao tác với file và API.', '30:00:00',
        'Beginner', 299000, 4.7),
       (1002, 'Thiết kế UI/UX hiện đại với Figma', 'Từ nguyên lý thiết kế đến thực hành các dự án thực tế trên Figma.',
        '24:00:00', 'Intermediate', 499000, 4.6),
       (1003, 'Phân tích dữ liệu với Excel và Power BI', 'Khai thác sức mạnh phân tích dữ liệu từ công cụ phổ biến.',
        '40:00:00', 'Beginner', 399000, 4.8),
       (1004, 'Digital Marketing toàn diện 2024', 'Học SEO, chạy quảng cáo, social media và phễu chuyển đổi.',
        '50:00:00', 'Advanced', 799000, 4.5),
       (1005, 'Lập trình Web với HTML, CSS và JavaScript',
        'Khóa học nền tảng cho lập trình web, không yêu cầu kiến thức trước.', '36:00:00', 'Beginner', 350000, 4.6);

insert into category (categoryId, category)
values (1, 'Programming'),
       (2, 'Python'),
       (3, 'Design'),
       (4, 'UI/UX'),
       (5, 'Data'),
       (6, 'Excel'),
       (7, 'Power BI'),
       (8, 'Marketing'),
       (9, 'SEO'),
       (10, 'Social Media'),
       (11, 'Web Development');

insert into course_category (courseId, categoryId)
values (1001, 1),
       (1001, 2),
       (1002, 3),
       (1002, 4),
       (1003, 5),
       (1003, 6),
       (1003, 7),
       (1004, 8),
       (1004, 9),
       (1004, 10),
       (1005, 1),
       (1005, 11);

insert into lesson (lessonId, lesson)
values (1, 'Biến & Kiểu dữ liệu'),
       (2, 'Câu điều kiện'),
       (3, 'Vòng lặp'),
       (4, 'OOP'),
       (5, 'Wireframe'),
       (6, 'Prototype'),
       (7, 'Design system'),
       (8, 'PivotTable'),
       (9, 'Chart'),
       (10, 'Power Query'),
       (11, 'DAX'),
       (12, 'SEO Onpage'),
       (13, 'Facebook Ads'),
       (14, 'Google Analytics'),
       (15, 'HTML5'),
       (16, 'CSS3'),
       (17, 'DOM'),
       (18, 'JavaScript cơ bản');

insert into course_lesson (courseId, lessonId)
values (1001, 1),
       (1001, 2),
       (1001, 3),
       (1001, 4),
       (1002, 5),
       (1002, 6),
       (1002, 7),
       (1003, 8),
       (1003, 9),
       (1003, 10),
       (1003, 11),
       (1004, 12),
       (1004, 13),
       (1004, 14),
       (1005, 15),
       (1005, 16),
       (1005, 17),
       (1005, 18);
