use construction_management;

# building with highest cost
select max(cost) as MaxCost
from building;

# building with cost > all buildings in can tho
select *
from building
where cost > all (select cost from building where city = 'can tho');

# building with cost > any building in can tho
select *
from building
where cost > any (select cost from building where city = 'can tho');

# buildings without design
select *
from building
where id not in (select distinct building_id from design);

# find architects same birth, place
select a1.name, a2.name, a1.birthday, a1.place
from architect a1
       inner join architect a2 on a1.id != a2.id and a1.birthday = a2.birthday and a1.place = a2.place;

# average benefit of architects
select a.id, a.name, avg(d.benefit)
from design d
       right join architect a on a.id = d.architect_id
group by a.id;

# total building cost per city
select city, sum(cost) TotalCost
from building
group by city;

# buildings with total architect benefits > 50
select b.*, p.Paid
from building b,
     (select building_id, sum(benefit) Paid from design group by building_id having Paid > 50) p
where b.id = p.building_id;

# cities with >= 1 graduated architect
select place, count(*) Count
from architect
group by place
having Count >= 1;

# buildings and their host, contractor
select b.id, b.name, h.id, h.name, c.id, c.name
from building b,
     host h,
     contractor c
where b.host_id = h.id
  and b.contractor_id = c.id;

# buildings and their architects & benefit
select b.name building, a.name architect, d.benefit
from architect a
       inner join design d on a.id = d.architect_id
       inner join building b on d.building_id = b.id;

# name, address of building with contractor 'cty xd so 6'
select name, address
from building
where contractor_id = (select id from contractor where name = 'cty xd so 6');

# info of contractors of buildings in can tho designed by 'le kim dung'
select name, address, phone
from contractor
where id in (select contractor_id
             from building
             where id in (select building_id
                          from design
                          where architect_id = (select id from architect where name = 'le kim dung'))
               and city = 'can tho');

# graduated place of architects designed 'khach san quoc te' at 'can tho'
select place
from architect
where id in (select architect_id
             from design
             where building_id in (select id from building where name = 'khach san quoc te' and city = 'can tho'));

# name, birthday, year of workers with skill ('han', 'dien') joined buildings of contractor 'le van son'
select wr.name, wr.birthday, wr.year
from worker wr
       inner join work w on wr.id = w.worker_id
       inner join building b on w.building_id = b.id
       inner join contractor c on b.contractor_id = c.id
where wr.skill in ('han', 'dien')
  and c.name = 'le van son';

# workers joined 'khach san quoc te''s construction at 'can tho' from 15/12/1994 to 31/12/1994
select wr.*, to_days('1994-12-31') - to_days(w.date) days_worked
from work w
       inner join building b on w.building_id = b.id
       inner join worker wr on w.worker_id = wr.id
where b.name = 'khach san quoc te'
  and b.city = 'can tho'
  and w.date between '1994-12-15' and '1994-12-31';

# name, birthday of architects graduated at 'tp hcm' and designed >1 building with cost > 400M
select name, birthday
from architect
where place = 'tp hcm'
  and id in (select architect_id from design where building_id in (select id from building where cost > 400));

# name of the building with highest cost
select name, cost
from building
where cost = (select max(cost) from building);

# name of architects designed buildings of both contractors 'le van son', 'phong dich vu so xd'
select a.name
from architect a
       inner join (select t.id, count(*) count
                   from (select distinct a.id, c.name#, b.id, c.id
                         from building b
                                inner join contractor c on b.contractor_id = c.id
                                inner join design d on b.id = d.building_id
                                inner join architect a on d.architect_id = a.id
                         where c.name in ('le van son', 'phong dich vu so xd')) t
                   group by id
                   having count = 2) t on t.id = a.id;

# name of workers joined work at 'can tho' but not 'vinh long'
select id, name
from worker
where id in (select distinct w.worker_id
             from work w
                    inner join building b on w.building_id = b.id
             where b.city = 'can tho')
  and id not in (select distinct w.worker_id
                 from work w
                        inner join building b on w.building_id = b.id
                 where b.city = 'vinh long');

# name of contractor with cost higher than all buildings of contractor 'phong dich vu so xd'
select name
from contractor
where id in (select distinct contractor_id
             from building b
             where b.cost > all (select cost
                                 from building
                                 where contractor_id = (select id from contractor where name = 'phong dich vu so xd')));

# architects with benefit lower than average benefit of a building
select a.name, b.benefit
from architect a
       inner join (select architect_id, benefit
                   from design
                   where benefit < any (select avg(benefit) from design group by building_id)) b
                  on a.id = b.architect_id;

# name, address of contractor of building with lowest cost
select c.name, c.address
from contractor c
       inner join (select contractor_id from building order by cost limit 1) ct on c.id = ct.contractor_id;

# name, skill of workers joined constructions of buildings designed by 'le thanh tung'
select wr.name, wr.skill
from design d
       inner join (select * from architect where name = 'le thanh tung') t on d.architect_id = t.id
       inner join work w on w.building_id = d.building_id
       inner join worker wr on w.worker_id = wr.id;

# find pairs of contractors with building of same city
select distinct c.name, contractor_id, b.city
from building b
       inner join (select city, count(distinct contractor_id) count from building group by city having count > 1) m
                  on b.city = m.city
       inner join contractor c on b.contractor_id = c.id;

# total sum of buildings by contractor
select c.name, sum(cost) total_cost
from building b
       # design d
       inner join contractor c on b.contractor_id = c.id
group by c.id;

# name of architects with benefit > 25
select a.name, b.total
from architect a
       inner join (select architect_id, sum(benefit) total from design group by architect_id having total > 25) b
                  on a.id = b.architect_id;

# number of architects with benefit > 25
select count(*) count_more_than_25
from (select a.name, b.total
      from architect a
             inner join (select architect_id, sum(benefit) total from design group by architect_id having total > 25) b
                        on a.id = b.architect_id) a;

# number of worker per building
select b.name, count(worker_id) worker_count
from work w
       inner join building b on w.building_id = b.id
group by building_id;

# name, address of building with max worker
select b.name, b.address, count(worker_id) worker_count
from work w
       inner join building b on w.building_id = b.id
group by building_id
order by worker_count desc
limit 1;

# name, average cost of buildings of cities
select city, avg(cost) average
from building
group by city;

# name of workers with more work days than 'nguyen hong van'
select wr.name, sum(w.total) days
from worker wr
       inner join work w on wr.id = w.worker_id
group by w.worker_id
having days > (select sum(total) total
               from work w
                      inner join worker wr on w.worker_id = wr.id
               where wr.name = 'nguyen hong van');

# number of buildings of each contractor in each city
select c.name, city, count(*) count
from building b
       inner join contractor c on b.contractor_id = c.id
group by contractor_id, city;

# workers that worked on all buildings
select wr.name, count(building_id) count
from worker wr
       inner join (select distinct building_id, worker_id from work order by building_id) wb on wr.id = wb.worker_id
group by worker_id
having count = (select count(distinct building_id) building_count from work);

# ====================================== #

create database employee_management;
use employee_management;

create table if not exists employee (
  id     int primary key auto_increment,
  name   nvarchar(50) not null,
  age    int          not null,
  salary int          not null,
  check ( age > 0 and salary > 0)
);

create table if not exists department (
  id   int primary key auto_increment,
  name nvarchar(50) not null
);

create table if not exists work (
  employee_id   int not null,
  department_id int not null,
  primary key (employee_id, department_id),
  foreign key (employee_id) references employee (id) on delete cascade,
  foreign key (department_id) references department (id) on delete cascade
);

insert into employee (id, name, age, salary)
values (1, 'John Doe', 30, 50000),
       (2, 'Jane Smith', 25, 60000),
       (3, 'Alice Johnson', 28, 55000),
       (4, 'Bob Brown', 35, 45000);

insert into department (id, name)
values (1, 'HR'),
       (2, 'Accounting'),
       (3, 'Marketing');

insert into work (employee_id, department_id)
values (1, 1),
       (1, 2),
       (2, 2),
       (2, 3),
       (3, 1),
       (3, 3),
       (4, 1),
       (4, 2),
       (4, 3);

# all employee from accounting
select e.id, e.name
from employee e
       inner join work w on e.id = w.employee_id
       inner join department d on w.department_id = d.id
where d.name = 'Accounting';

# all employees with salary > 50k
select id, name, salary
from employee
where salary > 50000;

# departments with its employee count
select d.name, count(*) employee_count
from work w
       inner join department d on w.department_id = d.id
       inner join employee e on w.employee_id = e.id
group by d.id;

# highest salary of each department, list all with same salary
select e.name, d.name, e.salary
from work w
       inner join department d on w.department_id = d.id
       inner join employee e on w.employee_id = e.id
       inner join (select d.id, d.name, max(e.salary) max
                   from work w
                          inner join department d on w.department_id = d.id
                          inner join employee e on w.employee_id = e.id
                   group by d.id) m on m.id = d.id
where salary >= m.max;

# departments with sum salary > 100k
select d.name, sum(salary) sum
from work w
       inner join department d on w.department_id = d.id
       inner join employee e on w.employee_id = e.id
group by d.id
having sum > 100000;

# employees in > 2 department
select e.name, count(*) count
from work w
       inner join department d on w.department_id = d.id
       inner join employee e on w.employee_id = e.id
group by e.id
having count > 2;
