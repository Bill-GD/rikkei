use phenikaa_employee;

create table employee_log (
  id      int primary key auto_increment,
  content longtext,
  count   int
);

create trigger saveEmployeeNumber
  after insert
  on employee
  for each row
begin
  declare employeeCount int default 0;
  declare logId int default (select max(id) from employee_log);

  select count(*) into employeeCount from employee;

  insert into employee_log (id, content, count) values (logId + 1, null, employeeCount);
end;

select *
from employee_log;

select *
from employee;

insert into employee (name, gender, email)
# values ('name-104', null, 'email104@gmail.com'),
#        ('name-105', null, 'email105@gmail.com'),
values ('name-106', null, 'email106@gmail.com'),
       ('name-107', null, 'email107@gmail.com'),
       ('name-108', null, 'email108@gmail.com'),
       ('name-109', null, 'email109@gmail.com'),
       ('name-110', null, 'email110@gmail.com'),
       ('name-111', null, 'email111@gmail.com');

show triggers;

drop trigger saveEmployeeNumber;

create trigger checkExceedLimit
  before insert
  on employee
  for each row
begin
  declare limitCount int default 110;
  declare current int default (select count(*) from employee);
  declare msg text default concat('Employee count reached limit (', limitCount, '). Cancelled insertion.');

  if current >= limitCount then signal sqlstate '45000' set message_text = msg ; end if;
end;

insert into employee (name, gender, email)
values ('name-112', null, 'email112@gmail.com');
