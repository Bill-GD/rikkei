create table if not exists Students (
  StudentID int primary key auto_increment,
  Name      nvarchar(50),
  Age       int,
  Major     nvarchar(50)
);

insert into Students (StudentID, Name, Age, Major)
values (1, 'Alice', 20, 'Computer Science'),
       (2, 'Bob', 22, 'Mathematics'),
       (3, 'Charlie', 21, 'Physics');

update Students
set Age = 23
where StudentID = 2;
