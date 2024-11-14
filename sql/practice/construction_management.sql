use construction_management;

# select distinct name, birthday
explain analyze select *
from architect;
select *
from architect
where birthday between 1956 and 1970;
select *
from architect
where place between 'c' and 'q';
select *
from architect
where name like '%_u_%';

select *
from building;

select *
from contractor;

select *
from design;

select *
from host;

select *
from work;

select *
from worker;

insert into architect (id, name, birthday, sex, place, address)
values (6, 'nguyen vinh an', 2003, 1, 'ha noi', '124 tran phu tp hanoi'),
       (7, 'le thi thu', 1982, 0, 'da nang', '617 da nang street');

update architect t
set t.birthday = 1969
where t.id = 3;

update architect t
set t.place = 'hai phong'
where t.place = 'ha noi';
