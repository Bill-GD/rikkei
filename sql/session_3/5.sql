create table if not exists students (
  studentID   int primary key auto_increment,
  studentName varchar(50) not null,
  major       varchar(50) not null
);

create table if not exists courses (
  courseID   int primary key auto_increment,
  courseName varchar(100) not null,
  instructor varchar(50)  not null
);

insert into students (studentID, studentName, major)
values (1, 'Alice', 'Computer Science'),
       (2, 'Bob', 'Mathematics'),
       (3, 'Charlie', 'Physics'),
       (4, 'David', 'Biology');

insert into courses
values (1, 'Database Systems', 'Dr. Smith'),
       (2, 'Algorithms', 'Prof. Johnson'),
       (3, 'Operating Systems', 'Dr. Brown');

update courses
set courseName = 'Advanced Mathematics'
where courseID = 2;

update students
set major = 'Engineering'
where studentID = 3;

delete
from students
where studentID = 1;
delete
from courses
where courseID = 3;

select *
from students;
select *
from courses;
