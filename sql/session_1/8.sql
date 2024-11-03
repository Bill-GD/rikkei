create table if not exists project (
  project_id int primary key auto_increment,
  name       nvarchar(50) not null,
  start      datetime     not null,
  end        datetime     not null,
  fund       int          not null
);

create table if not exists employee (
  employee_id int primary key auto_increment,
  name        nvarchar(50) not null,
  position    nvarchar(16) not null
);

create table if not exists assignment (
  assignment_id int primary key auto_increment,
  project_id    int      not null,
  employee_id   int      not null,
  start         datetime not null,
  end           datetime not null,
  foreign key (project_id) references project (project_id),
  foreign key (employee_id) references employee (employee_id)
);

create table if not exists task (
  task_id     int primary key auto_increment,
  employee_id int          not null,
  name        nvarchar(50) not null,
  start       datetime     not null,
  end         datetime     not null,
  status      nvarchar(16) not null,
  foreign key (employee_id) references employee (employee_id)
);
