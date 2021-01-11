CREATE DATABASE  IF NOT EXISTS `wgsa_company` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `wgsa_company`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: wgsa_company
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `Phone_num` int DEFAULT NULL,
  `Bnum` int NOT NULL,
  `Location` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Bnum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (13879684,1,'Helwan'),(13005645,2,'Maadi'),(13897456,3,'kozika');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card` (
  `Serial_number` int NOT NULL,
  `Recharge_code` int NOT NULL,
  `Card_value` int NOT NULL,
  `Is_charged` tinyint(1) DEFAULT '0',
  `Recharged_by` int DEFAULT NULL,
  `Recharge_date` date DEFAULT NULL,
  PRIMARY KEY (`Serial_number`),
  KEY `Recharged_by` (`Recharged_by`),
  CONSTRAINT `card_ibfk_1` FOREIGN KEY (`Recharged_by`) REFERENCES `customer` (`Phone_num`)
        ON DELETE NO ACTION 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES (123456,11111111,200,1,13789321,'2021-05-09'),(353535,44444444,20,0,NULL,NULL),(516874,53878211,20,1,13878625,'2021-02-08'),(654321,22222222,50,1,13789321,'2021-02-07'),(656565,33333333,35,0,NULL,NULL),(876854,51376861,50,0,NULL,NULL),(897897,68739431,35,0,NULL,NULL);
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaint`
--

DROP TABLE IF EXISTS `complaint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaint` (
  `C_Code` int NOT NULL,
  `C_Status` varchar(10) DEFAULT 'Wait',
  `C_Descrip` varchar(50) NOT NULL,
  `Complaint_by` int NOT NULL,
  `Complaint_date` date NOT NULL,
  `Replied_by` int DEFAULT NULL,
  `Reply_date` date DEFAULT NULL,
  `Reply` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`C_Code`),
  KEY `Complaint_by` (`Complaint_by`),
  KEY `Replied_by` (`Replied_by`),
  CONSTRAINT `complaint_ibfk_1` FOREIGN KEY (`Complaint_by`) REFERENCES `customer` (`Phone_num`)    -- GH: CHK
        ON DELETE CASCADE
        ON UPDATE CASCADE,
  CONSTRAINT `complaint_ibfk_2` FOREIGN KEY (`Replied_by`) REFERENCES `employee` (`Ssn`)
        ON DELETE set NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaint`
--

LOCK TABLES `complaint` WRITE;
/*!40000 ALTER TABLE `complaint` DISABLE KEYS */;
INSERT INTO `complaint` VALUES (1,'Done','Unstable network',13269587,'2021-01-01',585858,'2021-01-05','Restart your phone'),(2,'Done','Disabled Service',13369147,'2021-05-06',895623,'2021-01-07','It will work after midnight'),(3,'Done','Call tone cancelation',13983569,'2021-02-07',585858,'2021-02-08','Call #123 to cancel call tone'),(4,'Wait','Change number',13153957,'2021-02-08',NULL,NULL,NULL),(5,'Wait','Service Doesnt Work',13006016,'2021-02-02',NULL,NULL,NULL);
/*!40000 ALTER TABLE `complaint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `Fname` varchar(50) NOT NULL,
  `Lname` varchar(50) NOT NULL,
  `Id` int NOT NULL,
  `Phone_num` int NOT NULL,
  `Plan_code` int DEFAULT '0',
  `Balance` float DEFAULT '0',
  `Address` varchar(50) DEFAULT NULL,
  `Gender` char(1) DEFAULT NULL,
  `Used_min` int DEFAULT '0',
  `Used_megas` int DEFAULT '0',
  `Renewal_date` date DEFAULT NULL,
  `Password` varchar(50) NOT NULL,
  PRIMARY KEY (`Phone_num`),
  KEY `Plan_code` (`Plan_code`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`Plan_code`) REFERENCES `plan` (`Plan_code`)
        ON DELETE RESTRict
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('Ahmed','Gamal',12,13006016,112,119,'Helwan','M',50,350,'2020-06-11','12345678'),('Marawan','Emad',1,13153957,333,720,'Rehab','M',100,500,'2020-08-10','12345678'),('Ghieath','Ajam',13,13264975,777,798,'Sadat','M',0,660,'2020-06-09','12345678'),('Mohamed','Salama',14,13265831,555,320,'Aswan','M',70,700,'2020-09-09','12345678'),('Gehan','Elsadat',2,13267953,333,500,'Zatoon','F',90,400,'2021-05-05','12345678'),('Andrew','Boshra',15,13269587,112,0,'qwesna','M',83,2000,'2020-08-07','12345678'),('Gamal ','Abbas',3,13324489,333,500,'Shobra','M',100,500,'2020-07-11','12345678'),('Aya','Mohsn',4,13349267,333,800,'Hawamdeia','F',100,500,'2020-08-11','12345678'),('Israa','Gamal',5,13357741,333,200,'Zatoon','F',100,500,'2020-08-03','12345678'),('Alaa','Ali',6,13369147,333,200,'Shobra','M',100,500,'2020-08-04','12345678'),('Retag','Fawzy',7,13498735,333,500,'Dokii','F',100,500,'2020-08-05','12345678'),('Khadija','Asad',20,13543687,777,100,'Shobra','F',200,100,'2020-05-19','12345678'),('Hamid ','Tarek',8,13556699,333,200,'Sheben','M',100,550,'2020-08-05','12345678'),('Tarek','Fahmy',9,13654456,112,350,'Zayed','M',100,500,'2020-08-02','12345678'),('Manar','hasan',16,13753357,333,23,'october','F',15,70,'2020-05-03','12345678'),('Ibrahim','Alaa',10,13789321,333,700,'Gmeza','M',100,500,'2020-08-12','12345678'),('Israa','Ahmed',18,13827456,112,0,'Alexandria','F',500,0,'2020-04-09','12345678'),('Menna','Hasan',19,13836554,555,180,'Bolaq','F',150,500,'2020-05-29','12345678'),('Aisha','Abdullah',21,13878625,112,50,'Dokki','F',350,400,'2020-05-10','12345678'),('Waleed','Anwar',17,13983569,333,159,'Giza','M',66,400,'2020-05-09','12345678'),('Youssef','Gamal',11,13987354,333,670,'Luxor','M',100,500,'2020-08-07','12345678');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dep_loc`
--

DROP TABLE IF EXISTS `dep_loc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dep_loc` (
  `Dno` int NOT NULL,
  `Bnum` int NOT NULL,
  PRIMARY KEY (`Bnum`,`Dno`),
  KEY `Dno` (`Dno`),
  CONSTRAINT `dep_loc_ibfk_1` FOREIGN KEY (`Bnum`) REFERENCES `branch` (`Bnum`),
        ON DELETE CASCADE
        ON UPDATE CASCADE,
  CONSTRAINT `dep_loc_ibfk_2` FOREIGN KEY (`Dno`) REFERENCES `department` (`Dnum`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dep_loc`
--

LOCK TABLES `dep_loc` WRITE;
/*!40000 ALTER TABLE `dep_loc` DISABLE KEYS */;
INSERT INTO `dep_loc` VALUES (80,1),(80,2),(80,3),(81,1),(81,2),(81,3),(82,1),(82,2),(82,3),(83,1),(83,2),(83,3),(84,1),(84,2),(84,3);
/*!40000 ALTER TABLE `dep_loc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `Dnum` int NOT NULL,
  `Dname` varchar(50) NOT NULL,
  `Mgr_ssn` int NOT NULL,
  `Mgr_start_date` date DEFAULT NULL,
  PRIMARY KEY (`Dnum`),
  KEY `Mgr_ssn` (`Mgr_ssn`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`Mgr_ssn`) REFERENCES `employee` (`Ssn`)
        ON DELETE RESTRict
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (80,'HR',444999,'2005-01-09'),(81,'CS',357753,'2007-01-08'),(82,'Mangement',784512,'2009-05-01'),(83,'Data',898989,'2008-01-01'),(84,'Technical Support',896435,'2006-01-01');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `Fname` varchar(50) NOT NULL,
  `Lname` varchar(50) NOT NULL,
  `Dnum` int NOT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `Ssn` int NOT NULL,
  `Postion` varchar(50) DEFAULT NULL,
  `Salary` int NOT NULL,
  `Branch_num` int NOT NULL,
  `Hours` int DEFAULT NULL,
  `Gender` char(1) DEFAULT NULL,
  `Phone_num` int DEFAULT NULL,
  `Super_ssn` int DEFAULT NULL,
  `Password` varchar(50) NOT NULL,
  PRIMARY KEY (`Ssn`),
  UNIQUE KEY `Phone_num_UNIQUE` (`Phone_num`),
  KEY `Super_ssn` (`Super_ssn`),
  KEY `Branch_num` (`Branch_num`),
  KEY `Dnum` (`Dnum`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`Super_ssn`) REFERENCES `employee` (`Ssn`)
        ON DELETE set NULL
        ON UPDATE CASCADE,
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`Branch_num`) REFERENCES `branch` (`Bnum`)
        ON DELETE RESTRict
        ON UPDATE CASCADE,
  CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`Dnum`) REFERENCES `department` (`Dnum`)
        ON DELETE RESTRict
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('Reem','Tawfik',81,'Giza',132578,'DE',3000,1,6,'F',13455411,193728,'12345678'),('Mohamed','Atef',82,'Haram',135768,'HR',4000,2,8,'M',13555211,986623,'12345678'),('Raghad','Mahmoud',81,'Saft',135784,'CS',2500,1,6,'F',13556351,896435,'12345678'),('Zainab','Sayed',82,'Zayed',189541,'CS',3000,2,6,'F',13331546,896435,'12345678'),('Gamal','Abbas',83,'Shobra',193728,'DE',6500,1,8,'M',13324489,NULL,'12345678'),('Aya','mohsn',80,'hawamdeia',248629,'HR',3000,1,8,'F',13349267,444999,'12345678'),('Ibrahim','Alaa',80,'Gmeza',326598,'TS',2000,1,8,'M',13789321,896435,'12345678'),('Marawan','Emad',81,'Rehab',357753,'MGR_CS',5000,2,8,'M',13153957,NULL,'12345678'),('Retag','Fawzy',80,'Dokii',444999,'MGR_HR',8000,2,6,'F',13498735,NULL,'12345678'),('Youssef','Gamal',82,'Luxor',456147,'MG',4500,2,10,'M',13987354,898989,'12345678'),('Ahmed','Mahmoud',83,'Faisal',534887,'DE',4000,3,8,'M',13556854,NULL,'12345678'),('Tarek','Fahmy',81,'Zayed',585858,'CS',2000,3,8,'F',13654456,357753,'12345678'),('Israa','Gamal',82,'Zatoon',784512,'MGR_MG',5000,3,8,'F',13357741,NULL,'12345678'),('Weaam','Mahdy',81,'Bolak',846571,'HR',6000,1,8,'M',13689997,986623,'12345678'),('Tarek','Araby',83,'Mohandesen',879415,'TS',3500,3,6,'M',13546511,896435,'12345678'),('Alaa','Ali',81,'Shobra',895623,'CS',2500,2,8,'M',13369147,357753,'12345678'),('Kareem','Habiby',82,'Zamalek',896435,'MGR_TS',7000,2,10,'M',13546874,NULL,'12345678'),('Aya','Saeed',83,'October',897541,'CS',3250,3,6,'F',13535122,896435,'12345678'),('Hamid','Tarek',83,'Shbeen',898989,'MGR_DE',9000,3,8,'M',13556690,NULL,'12345678'),('Yousef','Shabrawy',81,'Dokki',986623,'HR',7250,1,10,'M',13559788,NULL,'12345678');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs`
--

DROP TABLE IF EXISTS `faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faqs` (
  `Answer` varchar(100) NOT NULL,
  `Question` varchar(100) NOT NULL,
  `Question_code` int NOT NULL,
  `Answered_by` int NOT NULL,
  PRIMARY KEY (`Question_code`),
  KEY `Answered_by` (`Answered_by`),
  CONSTRAINT `faqs_ibfk_1` FOREIGN KEY (`Answered_by`) REFERENCES `employee` (`Ssn`)
        ON DELETE NO ACTION 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs`
--

LOCK TABLES `faqs` WRITE;
/*!40000 ALTER TABLE `faqs` DISABLE KEYS */;
INSERT INTO `faqs` VALUES ('200 L.E','What is the price of WGSA  line?',1,585858),('a valid national ID','What are the required documents to buy a line?',2,585858),('Currently, there is no pre-booking for numbers.','Is there pre-booking of numbers?',3,585858),('9:00 AM -  5:00 PM','What are our working hours ?',4,895623),('Friday','What are off-days?',5,895623),('Not now, but who knows ;).','Are you available outside Egypt?',6,895623),('Yes, yes we are :).','Are you Gamed ?',7,895623),('1313','Whats are hotline ?',8,895623);
/*!40000 ALTER TABLE `faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offer`
--

DROP TABLE IF EXISTS `offer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offer` (
  `Launch_date` date DEFAULT NULL,
  `Price` float DEFAULT NULL,
  `Minutes` int DEFAULT NULL,
  `Expire_date` date DEFAULT NULL,
  `Megas` int DEFAULT NULL,
  `Offer_describ` varchar(200) DEFAULT NULL,
  `Offer_num` int NOT NULL,
  PRIMARY KEY (`Offer_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offer`
--

LOCK TABLES `offer` WRITE;
/*!40000 ALTER TABLE `offer` DISABLE KEYS */;
INSERT INTO `offer` VALUES ('2021-04-02',20,1000,'2021-05-03',500,'Send sms with DREAM to 222 with 5 pounds cost and get 1000 minutes and 500 megas for 3 days',1),('2021-05-01',10,600,'2021-06-02',800,'30% discount on 100 L.E qouta and get same minutes and megas  ',2),('2021-05-21',5,100,'2021-06-03',0,'get 100 minutes to use before midnight for 5 L.E. only',3),('2021-05-11',10,250,'2022-06-03',0,'250 minutes nefore midnight for 10 L.E.',4),('2021-08-01',20,1000,'2022-06-03',0,'1000 minutes for two days only for 20 L.E.',5),('2021-07-01',50,0,'2022-06-03',2500,'2500 Megabytes before midnight for 50 L.E. only',6),('2021-06-01',100,0,'2022-06-03',6000,'6 GIGABYTES for two days only for 100 L.E.',7),('2021-05-03',100,1000,'2022-06-03',1000,'1000 minutes, 1000 megas only for real customers and for just 100 L.E.',8);
/*!40000 ALTER TABLE `offer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offered_to`
--

DROP TABLE IF EXISTS `offered_to`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offered_to` (
  `Cus_Phone_num` int NOT NULL,
  `Offer_code` int NOT NULL,
  PRIMARY KEY (`Cus_Phone_num`,`Offer_code`),
  KEY `Offer_code` (`Offer_code`),
  CONSTRAINT `offered_to_ibfk_1` FOREIGN KEY (`Cus_Phone_num`) REFERENCES `customer` (`Phone_num`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
  CONSTRAINT `offered_to_ibfk_2` FOREIGN KEY (`Offer_code`) REFERENCES `offer` (`Offer_num`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offered_to`
--

LOCK TABLES `offered_to` WRITE;
/*!40000 ALTER TABLE `offered_to` DISABLE KEYS */;
INSERT INTO `offered_to` VALUES (13264975,1),(13269587,1),(13836554,1),(13153957,2),(13264975,2),(13498735,4),(13153957,5),(13498735,6);
/*!40000 ALTER TABLE `offered_to` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan`
--

DROP TABLE IF EXISTS `plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan` (
  `Plan_code` int NOT NULL,
  `Price` float DEFAULT NULL,
  `Minutes` int DEFAULT '0',
  `Megas` int DEFAULT '0',
  `Plan_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Plan_code`),
  UNIQUE KEY `Plan_name_UNIQUE` (`Plan_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
INSERT INTO `plan` VALUES (0,25,100,200,'Basic'),(112,100,600,3000,'WAFARX'),(115,100,50,6000,'Streamer_Special'),(116,50,600,100,'Talkie'),(333,50,300,500,'SPACEX'),(555,75,350,750,'GAMEPRO'),(777,150,1000,4000,'COMPAMIES_PLAN');
/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `Serv_code` int NOT NULL,
  `cost` float DEFAULT NULL,
  `S_descrip` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Serv_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,20,'Service_1'),(2,30,'Service_2'),(3,40,'Service_3'),(4,50,'Service_4'),(5,80,'Sports_News'),(6,60,'Stocks'),(7,50,'WorldWide_News');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sign_for`
--

DROP TABLE IF EXISTS `sign_for`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sign_for` (
  `Cus_Phone_num` int NOT NULL,
  `Service_code` int NOT NULL,
  PRIMARY KEY (`Cus_Phone_num`,`Service_code`),
  KEY `sign_for_ibfk_2` (`Service_code`),
  CONSTRAINT `sign_for_ibfk_1` FOREIGN KEY (`Cus_Phone_num`) REFERENCES `customer` (`Phone_num`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
  CONSTRAINT `sign_for_ibfk_2` FOREIGN KEY (`Service_code`) REFERENCES `services` (`Serv_code`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sign_for`
--

LOCK TABLES `sign_for` WRITE;
/*!40000 ALTER TABLE `sign_for` DISABLE KEYS */;
INSERT INTO `sign_for` VALUES (13269587,1),(13369147,1),(13369147,2),(13987354,2),(13265831,3),(13265831,4),(13987354,4),(13265831,5),(13753357,5),(13369147,6),(13753357,6),(13753357,7),(13987354,7);
/*!40000 ALTER TABLE `sign_for` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-11 18:48:32
