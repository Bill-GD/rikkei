-- MySQL dump 10.13  Distrib 8.0.40, for macos14 (arm64)
--
-- Host: localhost    Database: authen_db
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `benefit`
--

DROP TABLE IF EXISTS `benefit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `benefit` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `value` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benefit`
--

LOCK TABLES `benefit` WRITE;
/*!40000 ALTER TABLE `benefit` DISABLE KEYS */;
INSERT INTO `benefit` VALUES (1,'Bonus','14 tháng lương, tăng lương 2 lần/năm'),(2,'Healthcare Plan','Bảo hiểm đầy đủ theo quy định'),(3,'Paid Leave','Cơ hội nâng cao kiến thức, thăng tiến'),(4,'Training','Đào tạo quản lý, kỹ năng mềm'),(5,'Travel Opportunities','Company Trip, khám sức khoẻ'),(6,'Bonus','Lương thưởng theo năng lực'),(7,'Training','Continuous learning'),(8,'Awards','Exciting challenges'),(9,'Bonus','Creative workplace'),(10,'Others','Môi trường làm việc năng động'),(11,'Training','Đào tạo nước ngoài'),(12,'Bonus','Lương thưởng hấp dẫn lên đến 300%'),(13,'Training','Continuous learning'),(14,'Awards','Exciting challenges'),(15,'Bonus','Creative workplace');
/*!40000 ALTER TABLE `benefit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'IT - Software'),(2,'Backend Developers'),(3,'Frontend Developers');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `job_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_constrainst_job_ref` FOREIGN KEY (`id`) REFERENCES `job` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'Yumeshin Vietnam','https://images.vietnamworks.com/pictureofcompany/8c/10756982.png',1),(2,'ARIS Vietnam Co., Ltd','https://images.vietnamworks.com/pictureofcompany/40/6215187.png',2),(3,'Gameloft','https://images.vietnamworks.com/pictureofcompany/e0/4079410.png',3),(4,'Shinhan DS Vietnam','https://images.vietnamworks.com/pictureofcompany/92/10668657.png',4),(5,'Gameloft HCM','https://images.vietnamworks.com/pictureofcompany/e0/4079410.png',5);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `id` int NOT NULL,
  `jobTitle` varchar(255) NOT NULL,
  `jobDescription` longtext,
  `jobRequirement` longtext,
  `salaryMin` int DEFAULT NULL,
  `salaryMax` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (1,'02 JAVA Web Developer (Hà Nội)','- Triển khai các ứng dụng trên nền tảng Java theo yêu cầu của khách hàng; - Tham gia phân tích, thiết kế, phát triển, bảo trì hệ thống; - Viết mã nguồn và thực hiện Unit test;','- Có ít nhất 1 năm kinh nghiệm Java; - Hiểu OOP, Clean Code, Design Patterns; - UML, Spring MVC, Hibernate; - Javascript frameworks; - MySQL, MongoDB, Redis; - Git',500,1000),(2,'Android Developer (Fresher/junior & Senior)','Trao đổi thêm khi phỏng vấn.','- Java, Android SDK, NDK, OOP, Web services; - SQL; - Có kinh nghiệm 1-2 năm; - Ưu tiên biết tiếng Nhật',300,0),(3,'Senior Front-End Developer','Web-based products for marketing, corporate sites, forums, newsletters.','3+ years front-end; HTML5, CSS, JS; DOM, Angular, Node, React; Git Bash, SVN',300,0),(4,'Web Developer (Fullstack)','Xây dựng các ứng dụng web cho ngân hàng và tài chính; bảo trì hệ thống.','3-5 năm kinh nghiệm; Java, Spring, Restful API, HTML, CSS; ưu tiên kinh nghiệm tài chính-ngân hàng',500,1500),(5,'Senior PHP Developer','Phát triển sản phẩm web, hỗ trợ marketing và các dự án nội bộ.','3 năm kinh nghiệm PHP, Framework Zend, CodeIgniter; HTML, CSS, JS; hiểu rõ Rest API, Git',300,0);
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_detail`
--

DROP TABLE IF EXISTS `job_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_detail` (
  `job_id` int NOT NULL,
  `category_id` int NOT NULL,
  `skill_id` int NOT NULL,
  `benefit_id` int NOT NULL,
  `location_id` int NOT NULL,
  PRIMARY KEY (`job_id`,`category_id`,`skill_id`,`benefit_id`,`location_id`),
  KEY `fk_constrainst_category_ref_07_idx` (`category_id`),
  KEY `fk_constrainst_location_ref_07_idx` (`location_id`),
  KEY `fk_constrainst_skill_ref_07_idx` (`skill_id`),
  KEY `fk_constrainst_benefit_ref_07_idx` (`benefit_id`),
  CONSTRAINT `fk_constrainst_category_ref_07` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_constrainst_job_ref_07` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_detail`
--

LOCK TABLES `job_detail` WRITE;
/*!40000 ALTER TABLE `job_detail` DISABLE KEYS */;
INSERT INTO `job_detail` VALUES (1,1,3,1,2),(1,1,3,5,2),(1,1,4,1,2),(1,1,4,5,2),(1,1,5,1,2),(1,1,5,4,2),(1,1,5,6,2),(1,1,7,1,2),(1,1,7,4,2),(1,1,7,6,2),(1,1,8,1,2),(1,1,8,5,2),(2,1,1,1,1),(2,1,1,4,1),(2,1,1,5,1),(2,1,2,1,1),(2,1,2,4,1),(2,1,2,5,1),(2,1,4,1,1),(2,1,4,4,1),(2,1,4,5,1),(2,1,6,1,1),(2,1,6,4,1),(2,1,6,5,1),(2,1,7,1,1),(2,1,7,4,1),(2,1,7,5,1),(2,1,9,1,1),(2,1,9,4,1),(2,1,9,5,1),(2,1,10,1,1),(2,1,10,4,1),(2,1,10,5,1),(2,1,11,1,1),(2,1,11,4,1),(2,1,11,5,1),(2,1,12,1,1),(2,1,12,4,1),(2,1,12,5,1),(2,1,13,1,1),(2,1,13,4,1),(2,1,13,5,1),(3,1,10,1,1),(3,1,10,4,1),(3,1,10,6,1),(3,1,11,1,1),(3,1,11,4,1),(3,1,11,6,1),(3,1,12,1,1),(3,1,12,4,1),(3,1,12,6,1),(3,1,13,1,1),(3,1,13,4,1),(3,1,13,6,1),(3,1,14,1,1),(3,1,14,4,1),(3,1,14,6,1),(3,1,15,1,1),(3,1,15,4,1),(3,1,15,6,1),(3,1,16,1,1),(3,1,16,4,1),(3,1,16,6,1),(3,1,17,1,1),(3,1,17,4,1),(3,1,17,6,1),(1,2,3,1,2),(1,2,3,5,2),(1,2,4,1,2),(1,2,4,5,2),(1,2,6,1,2),(1,2,6,4,2),(1,2,6,6,2),(1,2,8,1,2),(1,2,8,5,2),(1,2,9,1,2),(1,2,9,4,2),(1,2,9,6,2),(3,2,10,1,1),(3,2,10,4,1),(3,2,10,6,1),(3,2,11,1,1),(3,2,11,4,1),(3,2,11,6,1),(3,2,12,1,1),(3,2,12,4,1),(3,2,12,6,1),(3,2,13,1,1),(3,2,13,4,1),(3,2,13,6,1),(3,2,14,1,1),(3,2,14,4,1),(3,2,14,6,1),(3,2,15,1,1),(3,2,15,4,1),(3,2,15,6,1),(3,2,16,1,1),(3,2,16,4,1),(3,2,16,6,1),(3,2,17,1,1),(3,2,17,4,1),(3,2,17,6,1);
/*!40000 ALTER TABLE `job_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Hà Nội'),(2,'Hồ Chí Minh');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (1,'Android Ndk'),(2,'Android Sdk'),(3,'Back-End'),(4,'Front-End'),(5,'HTML'),(6,'Hibernate'),(7,'Java'),(8,'JavaScript'),(9,'PHP'),(10,'Restful Api'),(11,'Scrum'),(12,'Software Engineering'),(13,'Spring'),(14,'Spring Boots'),(15,'Spring MVC'),(16,'Struts'),(17,'Web Development'),(18,'Web Sevice'),(19,'Weblogic');
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(45) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'peter@gmail.com',NULL,'123123'),(2,'tony@gmail.com',NULL,'123123'),(3,'king_arthur@gmail.com',NULL,'123123'),(4,'loveguru@gmail.com',NULL,'123123'),(5,'james_deen@gmail.com',NULL,'123123');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-13 19:24:24
