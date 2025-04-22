-- MySQL dump 10.13  Distrib 9.3.0, for macos15.2 (arm64)
--
-- Host: localhost    Database: employees
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `ssn` varchar(11) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `division` varchar(50) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Alex Carter','123456789',34,'News Anchor','Broadcast',72000.00),(2,'Brian Miller','234567890',38,'Editor-in-Chief','Editorial',105000.00),(3,'Emily Scott','345678901',28,'Reporter','Editorial',58000.00),(4,'Carlos Mendes','456789012',31,'TV Host','Broadcast',69000.00),(5,'Nadia Petrescu','567890123',36,'Political Reporter','Editorial',64000.00),(6,'Tyler Brooks','678901234',37,'TV Producer','Production',87000.00),(7,'Isla O’Connor','789012345',32,'Reporter','Editorial',60000.00),(8,'Amira Khalil','890123456',31,'Newsroom Coordinator','Admin',51000.00),(9,'Jin Park','901234567',29,'Reporter','Editorial',61000.00),(10,'Lauren Adams','012345678',30,'Anchor','Broadcast',70000.00),(11,'Tariq Amin','102938475',33,'Reporter','Editorial',62000.00),(12,'Dae-Hyun Kim','564738291',35,'TV Producer','Production',90000.00),(13,'Sienna Brooks','837261940',27,'Weather Reporter','Broadcast',63000.00),(14,'Marcus Johnson','746192038',30,'Reporter','Editorial',61000.00),(15,'Zahra Noor','658374910',25,'Junior Reporter','Editorial',52000.00),(16,'Theo Laurent','091827364',40,'Foreign Correspondent','International',98000.00),(17,'Chiara Romano','192837465',30,'Anchor','Broadcast',71000.00),(18,'Ravi Deshmukh','918273645',28,'Camera Operator','Production',55000.00),(19,'Yuna Takahashi','564738291',27,'Reporter','Editorial',60000.00),(20,'Samir Farouk','135792468',39,'War Correspondent','International',102000.00);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay_statement`
--

DROP TABLE IF EXISTS `pay_statement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pay_statement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int DEFAULT NULL,
  `pay_month` date DEFAULT NULL,
  `amount_paid` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `pay_statement_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_statement`
--

LOCK TABLES `pay_statement` WRITE;
/*!40000 ALTER TABLE `pay_statement` DISABLE KEYS */;
/*!40000 ALTER TABLE `pay_statement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `total_pay_by_division`
--

DROP TABLE IF EXISTS `total_pay_by_division`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `total_pay_by_division` (
  `division` varchar(50) DEFAULT NULL,
  `pay_month` date DEFAULT NULL,
  `total_paid` decimal(32,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `total_pay_by_division`
--

LOCK TABLES `total_pay_by_division` WRITE;
/*!40000 ALTER TABLE `total_pay_by_division` DISABLE KEYS */;
/*!40000 ALTER TABLE `total_pay_by_division` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `total_pay_by_job`
--

DROP TABLE IF EXISTS `total_pay_by_job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `total_pay_by_job` (
  `job_title` varchar(50) DEFAULT NULL,
  `pay_month` date DEFAULT NULL,
  `total_paid` decimal(32,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `total_pay_by_job`
--

LOCK TABLES `total_pay_by_job` WRITE;
/*!40000 ALTER TABLE `total_pay_by_job` DISABLE KEYS */;
/*!40000 ALTER TABLE `total_pay_by_job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'employees'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-22 16:24:03
