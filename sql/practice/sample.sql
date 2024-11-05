-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2013 at 11:17 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

set SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
set time_zone = "+00:00";


/*!40101 set @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 set @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 set @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 set names utf8 */;

--
-- Database: `sql_qlct`
--

-- --------------------------------------------------------

--
-- Table structure for table `architect`
--

create table if not exists `architect` (
  `id`       int(11) not null auto_increment,
  `name`     varchar(255) default null,
  `birthday` int(4)       default null,
  `sex`      tinyint(1)   default '0' comment '1: Name - 0: Nữ',
  `place`    varchar(255) default null,
  `address`  varchar(255) default null,
  primary key (`id`)
) engine = InnoDB
  default charset = utf8
  auto_increment = 6;

--
-- Dumping data for table `architect`
--

insert into `architect` (`id`, `name`, `birthday`, `sex`, `place`, `address`)
values (1, 'le thanh tung', 1956, 1, 'tp hcm', '25 duong 3/2 tp bien hoa'),
       (2, 'le kim dung', 1952, 0, 'ha noi', '18/5 phan van tri tp can tho'),
       (3, 'nguyen anh thu', 1970, 0, 'new york', 'khu 2 dhct tp can tho'),
       (4, 'nguyen song do quyen', 1970, 0, 'can tho', '73 tran hung dao tp hcm'),
       (5, 'truong minh thai', 1950, 1, 'paris france', '12/2/5 tran phu tp hanoi');

-- --------------------------------------------------------

--
-- Table structure for table `building`
--

create table if not exists `building` (
  `id`            int(11) not null auto_increment,
  `name`          varchar(255) default null,
  `address`       varchar(255) default null,
  `city`          varchar(255) default null,
  `cost`          float        default null,
  `start`         date         default null,
  `host_id`       int(11) not null,
  `contractor_id` int(11) not null,
  primary key (`id`)
) engine = InnoDB
  default charset = utf8
  auto_increment = 9;

--
-- Dumping data for table `building`
--

insert into `building` (`id`, `name`, `address`, `city`, `cost`, `start`, `host_id`, `contractor_id`)
values (1, 'khach san quoc te', '5 nguyen an ninh', 'can tho', 450, '1994-12-13', 1, 1),
       (2, 'cong vien thieu nhi', '100 nguyen thai hoc	', 'can tho', 200, '1994-05-08', 2, 1),
       (3, 'hoi cho nong nghiep', 'bai cat', 'vinh long', 1000, '1994-06-10', 1, 1),
       (4, 'truong mg mang non', '48 cm thang 8', 'can tho', 30, '1994-07-10', 3, 3),
       (5, 'khoa trong trot dhct', 'khu ii dhct	', 'can tho', 3000, '1994-06-19', 4, 3),
       (6, 'van phong bitis', '25 phan dinh phung', 'ha noi', 40, '1994-05-10', 5, 3),
       (7, 'nha rieng 1', '124/5 nguyen trai', 'tp hcm', 65, '1994-11-15', 6, 2),
       (8, 'nha rieng 2', '76 chau van liem', 'ha noi', 200, '1994-06-09', 7, 4);

-- --------------------------------------------------------

--
-- Table structure for table `contractor`
--

create table if not exists `contractor` (
  `id`      int(11) not null auto_increment,
  `name`    varchar(255) default null,
  `phone`   varchar(45)  default null,
  `address` varchar(255) default null,
  primary key (`id`)
) engine = InnoDB
  default charset = utf8
  auto_increment = 5;

--
-- Dumping data for table `contractor`
--

insert into `contractor` (`id`, `name`, `phone`, `address`)
values (1, 'cty xd so 6', '567456', '5 phan chu trinh'),
       (2, 'phong dich vu so xd', '206481', '2 le van sy'),
       (3, 'le van son', '028374', '12 tran nhan ton'),
       (4, 'tran khai hoan', '658432', '20 nguyen thai hoc');

-- --------------------------------------------------------

--
-- Table structure for table `design`
--

create table if not exists `design` (
  `building_id`  int(11) not null,
  `architect_id` int(11) not null,
  `benefit`      float default null,
  primary key (`building_id`, `architect_id`)
) engine = InnoDB
  default charset = utf8;

--
-- Dumping data for table `design`
--

insert into `design` (`building_id`, `architect_id`, `benefit`)
values (1, 1, 25),
       (1, 5, 12),
       (2, 4, 6),
       (3, 3, 12),
       (4, 2, 20),
       (5, 5, 30),
       (6, 2, 40),
       (6, 5, 27),
       (7, 1, 10),
       (8, 2, 18);

-- --------------------------------------------------------

--
-- Table structure for table `host`
--

create table if not exists `host` (
  `id`      int(11) not null auto_increment,
  `name`    varchar(255) default null,
  `address` varchar(255) default null,
  primary key (`id`)
) engine = InnoDB
  default charset = utf8
  auto_increment = 8;

--
-- Dumping data for table `host`
--

insert into `host` (`id`, `name`, `address`)
values (1, 'so t mai du lich', '54 xo viet nghe tinh'),
       (2, 'so van hoa thong tin', '101 hai ba trung'),
       (3, 'so giao duc', '29 duong 3/2'),
       (4, 'dai hoc can tho', '56 duong 30/4'),
       (5, 'cty bitis', '29 phan dinh phung'),
       (6, 'nguyen thanh ha', '45 de tham'),
       (7, 'phan thanh liem', '48/6 huynh thuc khan');

-- --------------------------------------------------------

--
-- Table structure for table `work`
--

create table if not exists `work` (
  `building_id` int(11) not null,
  `worker_id`   int(11) not null,
  `date`        date   default null,
  `total`       int(4) default null,
  primary key (`building_id`, `worker_id`)
) engine = InnoDB
  default charset = utf8;

--
-- Dumping data for table `work`
--

insert into `work` (`building_id`, `worker_id`, `date`, `total`)
values (1, 1, '1994-12-15', 5),
       (1, 3, '1994-12-18', 6),
       (1, 6, '1994-09-14', 7),
       (2, 1, '1994-05-08', 20),
       (2, 4, '1994-05-10', 10),
       (2, 5, '1994-12-16', 5),
       (3, 4, '1994-10-06', 10),
       (3, 7, '1994-10-06', 18),
       (4, 1, '1994-09-07', 20),
       (4, 6, '1994-05-12', 7);

-- --------------------------------------------------------

--
-- Table structure for table `worker`
--

create table if not exists `worker` (
  `id`       int(11) not null auto_increment,
  `name`     varchar(45) default null,
  `birthday` int(4)      default null,
  `year`     int(4)      default null,
  `skill`    varchar(45) default null,
  primary key (`id`)
) engine = InnoDB
  default charset = utf8
  auto_increment = 8;

--
-- Dumping data for table `worker`
--

insert into `worker` (`id`, `name`, `birthday`, `year`, `skill`)
values (1, 'nguyen thi suu', 1945, 1960, 'ho'),
       (2, 'vi chi a', 1966, 1987, 'moc'),
       (3, 'le manh quoc', 1956, 1971, 'son'),
       (4, 'vo van chin', 1940, 1952, 'dien'),
       (5, 'le quyet thang', 1954, 1974, 'han'),
       (6, 'nguyen hong van', 1950, 1970, 'dien'),
       (7, 'dang van son', 1948, 1965, 'dien');

/*!40101 set CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 set CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 set COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
