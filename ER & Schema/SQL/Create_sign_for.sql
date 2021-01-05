CREATE TABLE `branch` (
  `Phone_num` int DEFAULT NULL,
  `Bnum` int NOT NULL,
  `Location` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Bnum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `card` (
  `Serial_number` int NOT NULL,
  `Recharge_code` int DEFAULT NULL,
  `Card_value` int DEFAULT NULL,
  `Is_charged` tinyint(1) DEFAULT NULL,
  `Recharged_by` int DEFAULT NULL,
  `Recharge_date` date DEFAULT NULL,
  PRIMARY KEY (`Serial_number`),
  KEY `Recharged_by` (`Recharged_by`),
  CONSTRAINT `card_ibfk_1` FOREIGN KEY (`Recharged_by`) REFERENCES `customer` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `complaint` (
  `C_Code` int NOT NULL,
  `C_Status` varchar(10) DEFAULT NULL,
  `C_Descrip` varchar(50) DEFAULT NULL,
  `Complaint_by` int DEFAULT NULL,
  `Complaint_date` date DEFAULT NULL,
  `Replied_by` int DEFAULT NULL,
  `Reply_date` int DEFAULT NULL,
  `Reply` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`C_Code`),
  KEY `Complaint_by` (`Complaint_by`),
  KEY `Replied_by` (`Replied_by`),
  CONSTRAINT `complaint_ibfk_1` FOREIGN KEY (`Complaint_by`) REFERENCES `customer` (`Id`),
  CONSTRAINT `complaint_ibfk_2` FOREIGN KEY (`Replied_by`) REFERENCES `employee` (`Ssn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `customer` (
  `Fname` varchar(50) DEFAULT NULL,
  `Lname` varchar(50) DEFAULT NULL,
  `Id` int NOT NULL,
  `Phone_num` int DEFAULT NULL,
  `Plan_code` int DEFAULT NULL,
  `Balance` float DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `Gender` char(1) DEFAULT NULL,
  `Used_min` int DEFAULT NULL,
  `Used_megas` int DEFAULT NULL,
  `Renewal_date` date DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Plan_code` (`Plan_code`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`Plan_code`) REFERENCES `plan` (`Plan_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `dep_loc` (
  `Dno` int NOT NULL,
  `Bnum` int NOT NULL,
  PRIMARY KEY (`Bnum`,`Dno`),
  KEY `Dno` (`Dno`),
  CONSTRAINT `dep_loc_ibfk_1` FOREIGN KEY (`Dno`) REFERENCES `branch` (`Bnum`),
  CONSTRAINT `dep_loc_ibfk_2` FOREIGN KEY (`Dno`) REFERENCES `department` (`Dnum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `department` (
  `Dnum` int NOT NULL,
  `Dname` varchar(50) DEFAULT NULL,
  `Mgr_ssn` int DEFAULT NULL,
  `Mgr_start_date` date DEFAULT NULL,
  PRIMARY KEY (`Dnum`),
  KEY `Mgr_ssn` (`Mgr_ssn`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`Mgr_ssn`) REFERENCES `employee` (`Ssn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `employee` (
  `Fname` varchar(50) DEFAULT NULL,
  `Lname` varchar(50) DEFAULT NULL,
  `Dnum` int DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `Ssn` int NOT NULL,
  `Postion` varchar(50) DEFAULT NULL,
  `Salary` int DEFAULT NULL,
  `Branch_num` int DEFAULT NULL,
  `Hours` int DEFAULT NULL,
  `Gender` char(1) DEFAULT NULL,
  `Phone_num` int DEFAULT NULL,
  `Super_ssn` int DEFAULT NULL,
  PRIMARY KEY (`Ssn`),
  KEY `Super_ssn` (`Super_ssn`),
  KEY `Branch_num` (`Branch_num`),
  KEY `Dnum` (`Dnum`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`Super_ssn`) REFERENCES `employee` (`Ssn`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`Branch_num`) REFERENCES `branch` (`Bnum`),
  CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`Dnum`) REFERENCES `department` (`Dnum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `faqs` (
  `Answer` varchar(100) DEFAULT NULL,
  `Question` varchar(100) DEFAULT NULL,
  `Question_code` int NOT NULL,
  `Answered_by` int DEFAULT NULL,
  PRIMARY KEY (`Question_code`),
  KEY `Answered_by` (`Answered_by`),
  CONSTRAINT `faqs_ibfk_1` FOREIGN KEY (`Answered_by`) REFERENCES `employee` (`Ssn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `offer` (
  `Launch_date` date DEFAULT NULL,
  `Price` float DEFAULT NULL,
  `Minutes` int DEFAULT NULL,
  `Expire_date` date DEFAULT NULL,
  `Megas` int DEFAULT NULL,
  `Offer_num` int NOT NULL,
  PRIMARY KEY (`Offer_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `plan` (
  `Plan_code` int NOT NULL,
  `Price` float DEFAULT NULL,
  `Minutes` int DEFAULT NULL,
  `Megas` int DEFAULT NULL,
  PRIMARY KEY (`Plan_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `sevices` (
  `Serv_code` int NOT NULL,
  `cost` float DEFAULT NULL,
  `S_descrip` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Serv_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `sign_for` (
  `Cus_id` int NOT NULL,
  `Service_code` int NOT NULL,
  PRIMARY KEY (`Cus_id`,`Service_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

Create Table wgsa_company.Sign_for
(
	Cus_id int,
    Service_code int,
    primary key(Cus_id,Service_code)
)