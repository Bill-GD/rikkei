create table if not exists guest (
  guest_id int primary key auto_increment,
  name     nvarchar(50) not null,
  address  nvarchar(50) not null,
  email    nvarchar(50) not null
);

create table if not exists room (
  room_id int primary key auto_increment,
  type    nvarchar(16) not null,
  cost    int          not null
);

create table if not exists reservation (
  reservation_id int primary key auto_increment,
  guest_id       int      not null,
  room_id        int      not null,
  start          datetime not null,
  end            datetime not null,
  foreign key (guest_id) references guest (guest_id),
  foreign key (room_id) references room (room_id)
);

create table if not exists service (
  service_id int primary key auto_increment,
  name       nvarchar(50) not null,
  cost       int          not null
);

create table if not exists service_usage (
  usage_id       int primary key auto_increment,
  reservation_id int      not null,
  service_id     int      not null,
  start          datetime not null,
  foreign key (reservation_id) references reservation (reservation_id),
  foreign key (service_id) references service (service_id)
);
