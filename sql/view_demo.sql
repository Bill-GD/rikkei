use construction_management;

create view not_retired as
select *
from architect
where birthday > 1964;

# view is considered a table
select *
from not_retired;

drop view not_retired;

create view view_architect_benefit as
select architect_id, sum(benefit)
from design
group by architect_id;

select *
from view_architect_benefit;
