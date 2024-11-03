create table if not exists student (
  student_id int primary key auto_increment,
  `name`     nvarchar(50) not null,
  birthday   date         not null
);

create table if not exists course (
  course_id int primary key auto_increment,
  `name`    nvarchar(100) not null,
  cost      int           not null
);

create table if not exists enrollment (
  student_id int not null,
  course_id  int not null,
  `date`     datetime,
  constraint foreign key (student_id) references student (student_id) on delete cascade,
  constraint foreign key (course_id) references course (course_id) on delete cascade
);
