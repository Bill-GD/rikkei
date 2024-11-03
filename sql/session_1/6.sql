create table if not exists event (
  event_id int primary key auto_increment,
  name     nvarchar(50)  not null,
  start    datetime      not null,
  location nvarchar(100) not null,
  fund     int           not null
);

create table if not exists attendee (
  attendee_id int primary key auto_increment,
  name        nvarchar(50) not null,
  email       nvarchar(50) not null
);

create table if not exists sponsor (
  sponsor_id  int primary key auto_increment,
  name        nvarchar(50) not null,
  contributed int          not null
);

create table if not exists event_attendee (
  event_id    int,
  attendee_id int,
  foreign key (event_id) references event (event_id),
  foreign key (attendee_id) references attendee (attendee_id)
);

create table if not exists event_sponsor (
  event_id   int,
  sponsor_id int,
  foreign key (event_id) references event (event_id),
  foreign key (sponsor_id) references sponsor (sponsor_id)
);
