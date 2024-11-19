use construction_management;

delimiter $$
create procedure get_all_male_architects()
begin
  select * from architect where sex = 1;
end $$
delimiter ;

delimiter $$
create procedure if not exists get_buildings_designed_by_female()
begin
  declare count int default 0;
  select distinct b.*
  from design d
         inner join building b on d.building_id = b.id
         inner join architect a on d.architect_id = a.id
  where a.sex = 0
  order by id;
end $$
delimiter ;

delimiter $$
create procedure if not exists get_total_male_benefit()
begin
  declare total_benefit int;
  select sum(benefit)
  into total_benefit
  from design d
         inner join architect a on d.architect_id = a.id
  where sex = 1; # only assign the value
  select total_benefit; # show the value like normal selects
end $$
delimiter ;

delimiter $$
create procedure if not exists get_gender_total_benefit(in sex int)
begin
  declare total_benefit int;
  select sum(benefit)
  into total_benefit
  from design d
         inner join architect a on d.architect_id = a.id
  where a.sex = sex;
  select case when sex = 0 then 'Female' when sex = 1 then 'Male' end gender, total_benefit;
end $$
delimiter ;

# global/user-defined vars
set @gender = 1;
# declare not allowed here

call get_all_male_architects();
call get_buildings_designed_by_female();
call get_total_male_benefit();
call get_gender_total_benefit(0);

# ==================================================== #

# create database employee_management;
use employee_management;

delimiter $$
create procedure if not exists clear_data()
begin
  delete from employee;
  delete from department;
  delete from work;
  select 'Done' Result;
end $$
delimiter ;

call clear_data();

delimiter $$
create procedure if not exists insert_employees()
begin
  declare counter int default 0;
  declare employeeName varchar(50);
  declare employeeAge int;
  declare employeeSalary int;

  while counter <= 1000
    do
      set employeeName = concat('ABC ', counter);
      # set employeeEmail = concat('abc', counter, '@pragimtech.com');
      # set employeeDept = concat('Dept ', counter);
      set employeeAge = floor(rand() * 10) + 20;
      set employeeSalary = floor(rand() * 10) + 2;

      insert into Employee (id, name, age, salary) values (counter, employeeName, employeeAge, employeeSalary);

      set counter = counter + 1;
      if counter % 100 = 0 then select concat(counter, ' rows inserted') as Progress; end if;
    end while;
end $$
delimiter ;

call insert_employees();

select *
from employee
limit 10;

delimiter $$
create procedure if not exists get_data(in page int, in page_size int)
begin
  # can't use math in select offset
  declare offset_value int default page_size * (page - 1);
  select * from employee limit page_size offset offset_value;
end $$
delimiter ;

call get_data(2, 5);

select @page, @page_size; # params are local (same syntax)

