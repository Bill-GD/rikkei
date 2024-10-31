create database if not exists ecommercedb;
use ecommercedb;

create table if not exists `Users` (
  `ID`           int primary key auto_increment,
  `username`     varchar(50)         not null,
  `passwordHash` varchar(255)        not null,
  `email`        varchar(100) unique not null
);

create table if not exists `Products` (
  `ID`          int primary key auto_increment,
  `productName` varchar(100)   not null,
  `description` text,
  `price`       decimal(10, 2) not null,
  `stock`       int            not null
);

create table if not exists `Cart` (
  `ID`     int primary key auto_increment,
  `userID` int,
  total    int not null,
  foreign key (`userID`) references `Users` (`ID`)
);

create table if not exists `CartItems` (
  `ID`        int primary key auto_increment,
  `cartID`    int,
  `productID` int,
  quantity    int not null,
  foreign key (`cartID`) references `Cart` (`ID`),
  foreign key (`productID`) references `Products` (`ID`)
);


create database if not exists `contruction_job`;
use `contruction_job`;

create table if not exists `host` (
  `id`      int primary key auto_increment,
  `name`    varchar(45) not null,
  `address` varchar(45) not null
);

create table if not exists `contractor` (
  `id`            int primary key auto_increment,
  `name`          varchar(255) not null,
  `address`       varchar(255) not null,
  `contractorcol` varchar(45)
);

create table if not exists `building` (
  `id`            int primary key auto_increment,
  `name`          varchar(45) not null,
  `address`       varchar(45) not null,
  `city`          varchar(45) not null,
  `cost`          float       not null,
  `start`         date        not null,
  `host_id`       int         not null,
  `contractor_id` int         not null,
  foreign key (`host_id`) references `host` (`id`),
  foreign key (`contractor_id`) references `contractor` (`id`)
);

create table if not exists `architect` (
  `id`       int primary key auto_increment,
  `name`     varchar(255) not null,
  `sex`      tinyint(1)   not null,
  `birthday` date         not null,
  `place`    varchar(255) not null,
  `address`  varchar(255) not null
);

create table if not exists `design` (
  `building_id`  int,
  `architect_id` int,
  `benefit`      varchar(4),
  foreign key (`building_id`) references `building` (`id`),
  foreign key (`architect_id`) references `architect` (`id`)
);

create table if not exists `worker` (
  `id`       int primary key auto_increment,
  `name`     varchar(45) not null,
  `birthday` date        not null,
  `year`     varchar(45) not null,
  `skill`    varchar(45) not null
);

create table if not exists `work` (
  `building_id` int,
  `worker_id`   int,
  `date`        date        not null,
  `total`       varchar(45) not null,
  foreign key (`building_id`) references `building` (`id`),
  foreign key (`worker_id`) references `worker` (`id`)
);
