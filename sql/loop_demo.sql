create database if not exists phenikaa_employee;

use phenikaa_employee;

create table if not exists employee (
  id     int primary key auto_increment,
  name   varchar(50),
  gender tinyint,
  email  varchar(100)
);

delimiter $$
create procedure if not exists autoInsertEmployees()
begin
  declare counter int default 0;
  declare defaultName varchar(50) default 'abc-';
  declare defaultEmail varchar(100) default 'abc';

  LOOP_LABEL:
  loop
    set counter = counter + 1;
    insert into employee (id, name, email)
    values (counter,
            concat(defaultName, counter),
            concat(defaultEmail, counter, '@gmail.com'));
    if counter = 100 then leave LOOP_LABEL; end if;
  end loop LOOP_LABEL;
end $$
delimiter ;

# set @n = 'abc-';
# select concat(@n, 1);

delimiter $$
create procedure if not exists autoInsertEmployees()
begin
  declare counter int default 0;
  declare defaultName varchar(50) default 'abc-';
  declare defaultEmail varchar(100) default 'abc';

  while counter < 100
    do
      set counter = counter + 1;
      insert into employee (id, name, email)
      values (counter,
              concat(defaultName, counter),
              concat(defaultEmail, counter, '@gmail.com'));
    end while;
end $$
delimiter ;

delimiter $$
create procedure if not exists autoInsertEmployees()
begin
  declare counter int default 0;
  declare defaultName varchar(50) default 'abc-';
  declare defaultEmail varchar(100) default 'abc';

  repeat
    set counter = counter + 1;
    insert into employee (id, name, email)
    values (counter,
            concat(defaultName, counter),
            concat(defaultEmail, counter, '@gmail.com'));
  until counter = 100 end repeat;
end $$
delimiter ;

call autoInsertEmployees();

select *
from employee;

drop procedure autoInsertEmployees;

delete
from employee;

delimiter $$
create procedure if not exists autoInsertHundredMoreEmployees()
begin
  declare current int default ifnull((select max(id) from employee), 0); # if null, runs indefinitely
  declare counter int default current;
  declare defaultName varchar(50) default 'abc-';
  declare defaultEmail varchar(100) default 'abc';

  repeat
    set counter = counter + 1;
    insert into employee (id, name, email)
    values (counter,
            concat(defaultName, counter),
            concat(defaultEmail, counter, '@gmail.com'));
  until counter = current + 100 end repeat;
end $$
delimiter ;

drop procedure autoInsertHundredMoreEmployees;
call autoInsertHundredMoreEmployees();

# create view `view_Employees` as
# select *
# from employee;
#
# create index `idx_Name` on view_Employees (name); # can't create index on view
#
# explain
# select *
# from view_Employees
# where name like '%165';
