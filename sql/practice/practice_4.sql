create database if not exists company_projects;
use company_projects;

create table if not exists Projects (
  ProjectID   int primary key auto_increment,
  ProjectName varchar(100)   not null,
  StartDate   date           not null,
  EndDate     date           not null,
  Budget      decimal(10, 2) not null
);

create table if not exists Employees (
  EmployeeID   int primary key auto_increment,
  EmployeeName varchar(100)   not null,
  Position     varchar(50)    not null,
  HireDate     date           not null,
  Salary       decimal(10, 2) not null
);

create table if not exists Tasks (
  TaskID      int primary key auto_increment,
  ProjectID   int           not null,
  TaskName    varchar(100)  not null,
  AssignedTo  int           not null,
  StartDate   date          not null,
  EndDate     date          not null,
  Status      varchar(50)   not null,
  HoursWorked decimal(5, 2) not null,
  foreign key (ProjectID) references Projects (ProjectID),
  foreign key (AssignedTo) references Employees (EmployeeID)
);

insert into Projects (ProjectID, ProjectName, StartDate, EndDate, Budget)
values (1, 'Project Alpha', '2023-01-01', '2023-12-31', 100000.00),
       (2, 'Project Beta', '2023-02-01', '2023-11-30', 150000.00),
       (3, 'Project Gamma', '2023-03-01', '2023-10-31', 200000.00),
       (4, 'Project Delta', '2023-04-01', '2023-09-30', 250000.00),
       (5, 'Project Epsilon', '2023-05-01', '2023-08-31', 300000.00);

insert into Employees (EmployeeID, EmployeeName, Position, HireDate, Salary)
values (1, 'John Doe', 'Manager', '2022-01-15', 75000.00),
       (2, 'Jane Smith', 'Developer', '2022-02-20', 65000.00),
       (3, 'Alice Johnson', 'Designer', '2022-03-25', 60000.00),
       (4, 'Bob Brown', 'Tester', '2022-04-30', 55000.00),
       (5, 'Charlie Davis', 'Support', '2022-05-10', 50000.00);

insert into Tasks (TaskID, ProjectID, TaskName, AssignedTo, StartDate, EndDate, Status, HoursWorked)
values (1, 1, 'Design Database', 3, '2023-01-01', '2023-01-15', 'Completed', 40.00),
       (2, 1, 'Develop Backend', 2, '2023-01-16', '2023-02-15', 'In Progress', 80.00),
       (3, 2, 'Create UI Mockups', 3, '2023-02-01', '2023-02-10', 'Completed', 30.00),
       (4, 2, 'Implement Frontend', 2, '2023-02-11', '2023-03-10', 'In Progress', 70.00),
       (5, 3, 'Test Application', 4, '2023-03-01', '2023-03-20', 'Pending', 20.00),
       (6, 4, 'Provide Support', 5, '2023-04-01', '2023-04-30', 'Pending', 10.00);

update Projects
set Budget = 50000.00
where ProjectID = 2;

update Tasks
set HoursWorked = 25.00
where TaskID = 4;

delete
from Employees
where EmployeeID = 3;

delete
from Tasks
where TaskID = 5;

# per hour: 50.00
select ProjectID, (sum(HoursWorked) * 50) as Cost
from Tasks
group by ProjectID;

select ProjectID,
       count(case when Status = 'Completed' then 1 else null end)   as Completed,
       count(case when Status = 'In Progress' then 1 else null end) as InProgress,
       count(case when Status = 'Pending' then 1 else null end)     as Pending
from Tasks
group by ProjectID;

select EmployeeID,
       EmployeeName,
       count(t.TaskID)                                       Count,
       if(sum(t.HoursWorked) is null, 0, sum(t.HoursWorked)) Hours
from Employees e
       left join Tasks t on e.EmployeeID = T.AssignedTo
group by EmployeeID;

select Position, avg(Salary)
from Employees
group by Position;
