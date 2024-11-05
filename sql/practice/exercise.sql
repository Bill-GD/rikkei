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
