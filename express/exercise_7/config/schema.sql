create database if not exists job_market;
use job_market;

create table if not exists company (
  company_id int primary key,
  name       varchar(255),
  logo       text
);

create table if not exists location (
  location_id   int primary key,
  location_name nvarchar(255)
);

create table if not exists job (
  job_id          int primary key,
  job_title       varchar(100) not null,
  job_description text         not null,
  job_requirement text         not null,
  salary_min      int          not null,
  salary_max      int          not null,
  location_id     int          not null,
  company_id      int          not null,
  foreign key (company_id) references company (company_id),
  foreign key (location_id) references location (location_id)
);

create table if not exists skill (
  skill_id   int primary key,
  skill_name varchar(255)
);

create table if not exists job_skills (
  job_id   int not null,
  skill_id int not null,
  foreign key (job_id) references job (job_id),
  foreign key (skill_id) references skill (skill_id)
);

create table if not exists category (
  category_id   int primary key,
  category_name nvarchar(255)
);

create table if not exists job_categories (
  job_id      int not null,
  category_id int not null,
  foreign key (job_id) references job (job_id),
  foreign key (category_id) references category (category_id)
);

create table if not exists benefit (
  benefit_id   int primary key,
  benefit_name varchar(100),
  value        text
);

create table if not exists job_benefits (
  job_id     int not null,
  benefit_id int not null,
  foreign key (job_id) references job (job_id),
  foreign key (benefit_id) references benefit (benefit_id)
);
