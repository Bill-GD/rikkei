use construction_management;

select max(cost) as MaxCost
from building;

select *
from building
where cost > all (select cost from building where city = 'can tho');

select *
from building
where cost > any (select cost from building where city = 'can tho');

select *
from building
where id not in (select distinct building_id from design);

# find architects same birth, place
select a1.name, a2.name, a1.birthday, a1.place
from architect a1
       inner join architect a2 on a1.id != a2.id and a1.birthday = a2.birthday and a1.place = a2.place;

select a.id, a.name, avg(d.benefit)
from design d
       right join architect a on a.id = d.architect_id
group by a.id;

select city, sum(cost) TotalCost
from building
group by city;

select b.*, p.Paid
from building b,
     (select building_id, sum(benefit) Paid from design group by building_id having Paid > 50) p
where b.id = p.building_id;

select place, count(*) Count
from architect
group by place
having Count >= 1;

# building, host, contractor
select b.id, b.name, h.id, h.name, c.id, c.name
from building b,
     host h,
     contractor c
where b.host_id = h.id
  and b.contractor_id = c.id;

select a.name architect, b.name building, d.benefit
from architect a
       inner join design d on a.id = d.architect_id
       inner join building b on d.building_id = b.id;

select *
from building
where contractor_id = (select id from contractor where name = 'cty xd so 6');

select *
from contractor
where id in (select contractor_id
             from building
             where id in (select building_id
                          from design
                          where architect_id = (select id from architect where name = 'le kim dung'))
               and city = 'can tho');

select place
from architect
where id in (select architect_id
             from design
             where building_id in (select id from building where name = 'khach san quoc te' and city = 'can tho'));

select wr.name, wr.birthday, wr.year
from worker wr
       inner join work w on wr.id = w.worker_id
       inner join building b on w.building_id = b.id
       inner join contractor c on b.contractor_id = c.id
where wr.skill in ('han', 'dien')
  and c.name = 'le van son';

select wr.*
from work w
       inner join building b on w.building_id = b.id
       inner join worker wr on w.worker_id = wr.id
where b.name = 'khach san quoc te'
  and b.city = 'can tho'
  and w.date between '1994-12-15' and '1994-12-31';

select *
from architect
where place = 'tp hcm'
  and id in (select architect_id from design where building_id in (select id from building where cost > 400));

select name, cost
from building
where cost = (select max(cost) from building);

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

select name
from contractor
where id in (select distinct contractor_id
             from building b
             where b.cost > all (select cost
                                 from building
                                 where contractor_id = (select id from contractor where name = 'phong dich vu so xd')));

select a.name, b.benefit
from architect a
       inner join (select architect_id, benefit
                   from design
                   where benefit < any (select avg(benefit) from design group by building_id)) b
                  on a.id = b.architect_id;

select c.name, c.address
from contractor c
       inner join (select contractor_id from building order by cost limit 1) ct on c.id = ct.contractor_id;

select wr.name, wr.skill
from design d
       inner join (select * from architect where name = 'le thanh tung') t on d.architect_id = t.id
       inner join work w on w.building_id = d.building_id
       inner join worker wr on w.worker_id = wr.id;

select distinct c.name, contractor_id, b.city
from building b
       inner join (select city, count(distinct contractor_id) count from building group by city having count > 1) m
                  on b.city = m.city
       inner join contractor c on b.contractor_id = c.id;

select c.name, sum(cost) total_cost
from building b
       # design d
       inner join contractor c on b.contractor_id = c.id
group by c.id;

select a.name, b.total
from architect a
       inner join (select architect_id, sum(benefit) total from design group by architect_id having total > 25) b
                  on a.id = b.architect_id;

select count(*) count_more_than_25
from (select a.name, b.total
      from architect a
             inner join (select architect_id, sum(benefit) total from design group by architect_id having total > 25) b
                        on a.id = b.architect_id) a;

select b.name, count(worker_id) worker_count
from work w
       inner join building b on w.building_id = b.id
group by building_id;

# TODO
select max(worker_count)
from (select count(worker_id) worker_count from work group by building_id) as c;
