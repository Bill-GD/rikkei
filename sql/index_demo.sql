create schema demo_index;
use demo_index;
create table Employees (
  Id         int primary key auto_increment,
  Name       varchar(50),
  Email      varchar(50),
  Department varchar(50)
);

delimiter $$

create procedure PopulateEmployees()
begin
  declare counter int default 1;
  declare employeeName varchar(50);
  declare employeeEmail varchar(50);
  declare employeeDept varchar(10);

  while counter <= 100000
    do
      set employeeName = concat('ABC ', counter);
      set employeeEmail = concat('abc', counter, '@pragimtech.com');
      set employeeDept = concat('Dept ', counter);

      insert into Employees (Name, Email, Department) values (employeeName, employeeEmail, employeeDept);

      set counter = counter + 1;

      if counter % 10000 = 0 then select concat(counter, ' rows inserted') as Progress; end if;
    end while;
end $$

delimiter ;

-- To execute the procedure and populate the table
call PopulateEmployees();

show indexes from Employees;
create index `Name` on Employees (Name);
drop index `Name` on Employees;

explain
select *
from Employees
where Name = 'ABC 1983';

explain
select *
from Employees
where Email = 'abc15@pragimtech.com';

select count(*)
from (select distinct Id from Employees) t;
