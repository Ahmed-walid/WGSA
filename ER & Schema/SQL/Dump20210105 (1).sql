-- CREATE DATABASE  IF NOT EXISTS `wgsa_company` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
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
INSERT INTO `branch` VALUES (19777,1,'Helwan'),(2000,2,'Maadi'),(90900,3,'kozika');
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
  `Is_charged` tinyint(1) DEFAULT 0,
  `Recharged_by` int DEFAULT NULL,
  `Recharge_date` date DEFAULT NULL,
  PRIMARY KEY (`Serial_number`),
  KEY `Recharged_by` (`Recharged_by`),
  CONSTRAINT `card_ibfk_1` FOREIGN KEY (`Recharged_by`) REFERENCES `customer` (`Phone_num`)   -- GH: chk [add customer start date for del no action - if we get history of cards for customer]
        ON DELETE NO ACTION 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES (123456,11111111,200,1,147852,'2021-05-09'),(353535,44444444,20,0,NULL,NULL),(654321,22222222,50,1,370555,'2021-02-07'),(656565,33333333,35,0,NULL,NULL);
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
  `C_Status` varchar(10) DEFAULT "Wait",
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
INSERT INTO `complaint` VALUES (50,'Done','Unstable network',370555,'2021-01-01',585858,'2021-01-05','Restart your phone'),(51,'Done','Disabled Service',654789,'2021-05-06',895623,'2021-01-07','It will work after midnight'),(52,'Done','Call tone cancelation',789654,'2021-02-07',585858,'2021-02-08','Call #123 to cancel call tone'),(53,'Wait','Change number',370555,'2021-02-08',NULL,NULL,NULL),(550,'Wait','Salama\'s complaint',157359,'2021-02-02',NULL,NULL,NULL);
/*!40000 ALTER TABLE `complaint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `Fname` varchar(50) not NULL,
  `Lname` varchar(50) not NULL,
  `Id` int NOT NULL,
  `Phone_num` int not NULL,
  `Plan_code` int DEFAULT 0,
  `Balance` float DEFAULT 0,
  `Address` varchar(50) DEFAULT NULL,
  `Gender` char(1) DEFAULT NULL,
  `Used_min` int DEFAULT 0,
  `Used_megas` int DEFAULT 0,
  `Renewal_date` date DEFAULT NULL,
  `Password` varchar(50) not NULL,
  PRIMARY KEY (`Phone_num`),
  KEY `Plan_code` (`Plan_code`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`Plan_code`) REFERENCES `plan` (`Plan_code`)
        ON DELETE RESTRict
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for   er`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('Tarek','Fahmy',123987,13654456,112,350,'Zayed','M',100,500,'2020-08-02','12345678'),('Israa','Gamal',143696,13357741,333,200,'Zatoon','F',100,500,'2020-08-03','12345678'),('Ahmed','Gamal',147852,1300601669,112,119,'Helwan','M',50,350,'2020-06-11','12345678'),('Aya','Mohsn',147896,13349267,333,800,'Hawamdeia','F',100,500,'2020-08-11','12345678'),('Youssef','Gamal',157359,13987354,333,670,'Luxor','M',100,500,'2020-08-07','12345678'),('Ibrahim','Alaa',202020,13789321,333,700,'Gmeza','M',100,500,'2020-08-12','12345678'),('Alaa','Ali',254114,13369147,333,200,'Shobra','M',100,500,'2020-08-04','12345678'),('Waleed','Anwar',258741,1398356917,333,159,'Giza','M',66,400,'2020-05-09','12345678'),('Gamal ','Abbas',258789,13324489,333,500,'Shobra','M',100,500,'2020-07-11','12345678'),('Retag','Fawzy',330202,13498735,333,500,'Dokii','F',100,500,'2020-08-05','12345678'),('Mohamed','Salama',369852,1326583147,555,320,'Aswan','M',70,700,'2020-09-09','12345678'),('Manar','hasan',370555,1375335789,333,23,'october','F',15,70,'2020-05-03','12345678'),('Marawan','Emad',548625,13153957,333,720,'Rehab','M',100,500,'2020-08-10','12345678'),('Hamid ','Tarek',556677,13556699,333,200,'Sheben','M',100,550,'2020-08-05','12345678'),('Ghieath','Ajam',654789,1326497562,777,798,'Sadat','M',0,660,'2020-06-09','12345678'),('Andrew','Boshra',789654,1326958756,112,0,'qwesna','M',83,2000,'2020-08-07','12345678'),('Gehan','Elsadat',871515,13267953,333,500,'Zatoon','F',90,400,'2021-05-05','12345678');
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
INSERT INTO `dep_loc` VALUES (80,1),(80,2),(80,3),(81,1),(81,2),(81,3),(82,1),(82,2),(82,3),(83,1),(83,2),(83,3);
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
INSERT INTO `department` VALUES (80,'HR',NULL,'2005-01-09'),(81,'CS',NULL,'2007-01-08'),(82,'Mangement',784512,'2009-05-01'),(83,'Data',NULL,'2008-01-01');
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
  `Password` varchar(50) NOT null,
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
INSERT INTO `employee` VALUES ('Gamal','Abbas',83,'Shobra',193728,'DE',6500,1,8,'M',13324489,898989,'12345678'),('Aya','mohsn',80,'hawamdeia',248629,'HR',3000,1,8,'F',13349267,444999,'12345678'),('Ibrahim','Alaa',80,'Gmeza',326598,'HR',2000,1,8,'M',13789321,444999,'12345678'),('Marawan','Emad',81,'Rehab',357753,'MGR_CS',5000,2,8,'M',13153957,NULL,'12345678'),('Retag','Fawzy',80,'Dokii',444999,'MGR_HR',8000,2,6,'F',13498735,NULL,'12345678'),('Youssef','Gamal',82,'Luxor',456147,'MG',4500,2,10,'M',13987354,898989,'12345678'),('Tarek','Fahmy',81,'Zayed',585858,'CS',2000,3,8,'F',13654456,357753,'12345678'),('Israa','Gamal',82,'Zatoon',784512,'MGR_MG',5000,3,8,'F',13357741,NULL,'12345678'),('Alaa','Ali',81,'Shobra',895623,'CS',2500,2,8,'M',13369147,357753,'12345678'),('Hamid','Tarek',83,'Shbeen',898989,'MGR_DE',9000,3,8,'M',13556699,NULL,'12345678');
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
INSERT INTO `faqs` VALUES ('200 L.E','What is the price of WGSA  line?',1,585858),('a valid national ID','What are the required documents to buy a line?',2,585858),('Currently, there is no pre-booking for numbers.','Is there pre-booking of numbers?',3,585858);
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
INSERT INTO `offer` VALUES ('2021-04-02',20,1000,'2021-05-03',500,'Send sms with DREAM to 222 with 5 pounds cost and get 1000 minutes and 500 megas for 3 days',1),('2021-05-01',10,600,'2021-06-02',800,'30% discount on 100 L.E qouta and get same minutes and megas  ',2);
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
INSERT INTO `offered_to` VALUES (147896,1),(202020,1),(157359,2),(254114,2);
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
  `Minutes` int DEFAULT 0,
  `Megas` int DEFAULT 0,
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
INSERT INTO `plan` VALUES (112,100,600,3000,'WAFARX'),(333,50,300,500,'SPACEX'),(555,75,350,750,'GAMEPRO'),(777,150,1000,4000,'COMPAMIES_PLAN');
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
INSERT INTO `services` VALUES (1,200,'Service_1'),(2,300,'Service_2'),(3,400,'Service_3'),(4,500,'Service_4');
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
INSERT INTO `sign_for` VALUES (147896,1),(157359,1),(202020,2),(254114,2),(258741,3),(258789,4);
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

-- Dump completed on 2021-01-05 15:00:31
-- GH EDIT ON 08-01-2021 04:02 PM
