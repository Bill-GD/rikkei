use construction_management;

select *
from architect;

select name, sex
from architect;

select distinct birthday
from architect
order by birthday asc;

select name, birthday
from architect
order by birthday asc;

select name, birthday
from architect
order by birthday desc;

select name, cost
from building
order by cost asc;

select *
from architect
where name = 'le thanh tung';

select name, birthday, skill
from worker
where skill in ('han', 'dien');

select name, birthday, skill
from worker
where skill in ('han', 'dien')
  and birthday > 1948;

select *
from worker
where birthday + 20 > year;

select *
from worker
where birthday in (1945, 1940, 1948);

select *
from worker
where birthday = 1945
   or birthday = 1940
   or birthday = 1948;

select *
from building
where cost between 200 and 500;

select name
from architect
where name like 'nguyen %';

select name
from architect
where name like '% anh %';

select name
from architect
where name like '% th_';

select *
from contractor
where phone is null;

select count(address), count(*)
from architect;

select count(id) as Count, sum(cost) as TotalRevenue
from building;

select avg(cost)
from building;

select Place, count(*) as Count
from architect
group by place
having Count > 1
order by Count;

select *
from building
where cost in (select distinct cost from building);

select id, name, cost
from building
where cost = any (select cost from building where city = 'ha noi');

select *
from worker
where birthday < all (select birthday from architect);

select *
from building
where id in (select distinct building_id from design);

select h.name as Host, b.name as Building
from host as h
       inner join building as b on h.id = b.host_id;

select h.name as Host, b.name as Building
from host as h
cross join
       # left outer join
        building as b on h.id = b.host_id;
