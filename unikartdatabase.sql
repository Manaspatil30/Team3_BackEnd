-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: localhost    Database: unikartdatabase
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `basket`
--

DROP TABLE IF EXISTS `basket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basket` (
  `basket_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`basket_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `basket_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userregistration` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket`
--

LOCK TABLES `basket` WRITE;
/*!40000 ALTER TABLE `basket` DISABLE KEYS */;
/*!40000 ALTER TABLE `basket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `basketitems`
--

DROP TABLE IF EXISTS `basketitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basketitems` (
  `basket_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`basket_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `basketitems_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userregistration` (`user_id`),
  CONSTRAINT `basketitems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basketitems`
--

LOCK TABLES `basketitems` WRITE;
/*!40000 ALTER TABLE `basketitems` DISABLE KEYS */;
INSERT INTO `basketitems` VALUES (9,1,1,100.00,4);
/*!40000 ALTER TABLE `basketitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membershiptypes`
--

DROP TABLE IF EXISTS `membershiptypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membershiptypes` (
  `MembershipTypeID` int NOT NULL AUTO_INCREMENT,
  `TypeName` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Description` text COLLATE utf8mb4_general_ci,
  `Price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`MembershipTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membershiptypes`
--

LOCK TABLES `membershiptypes` WRITE;
/*!40000 ALTER TABLE `membershiptypes` DISABLE KEYS */;
INSERT INTO `membershiptypes` VALUES (1,'Bronze','Bronze membership offers basic access to our product comparison tool, allowing customers to compare prices across different stores.',10.00),(2,'Silver','Silver membership includes all the benefits of Bronze, plus access to exclusive deals and promotions, and a 5% discount on all orders.',20.00),(3,'Gold','Gold membership provides all the benefits of Silver, in addition to free delivery for all orders, priority customer support, and a 10% discount on all orders.',30.00);
/*!40000 ALTER TABLE `membershiptypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `order_detail_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `store_product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price_at_purchase` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`order_detail_id`),
  KEY `order_id` (`order_id`),
  KEY `store_product_id` (`store_product_id`),
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`store_product_id`) REFERENCES `storeproducts` (`store_product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `basket_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `order_status` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `delivery_address` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`order_id`),
  KEY `basket_id` (`basket_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`basket_id`) REFERENCES `basket` (`basket_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `userregistration` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `category` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `best_before` date DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Apples','Fresh Apples','Fruits',100,'2023-12-31'),(2,'Pears','Juicy Pears','Fruits',100,'2023-12-31'),(3,'Milk','2% Milk','Dairy',200,'2023-12-31'),(4,'Cheese','Cheddar Cheese','Dairy',100,'2023-12-31'),(5,'Carrots','Fresh Carrots','Vegetables',100,'2023-12-31'),(6,'Bananas','Ripe Bananas','Fruits',150,'2023-12-20'),(7,'Yogurt','Natural Yogurt','Dairy',200,'2023-12-15'),(8,'Bread','Whole Wheat Bread','Bakery',100,'2023-12-10'),(9,'Eggs','Free-range Eggs','Dairy',200,'2023-12-25'),(10,'Tomatoes','Organic Tomatoes','Vegetables',100,'2023-12-18'),(11,'Chicken Breast','Fresh Chicken Breast','Meat',100,'2023-12-08'),(12,'Ground Beef','Lean Ground Beef','Meat',150,'2023-12-09'),(13,'Salmon','Wild-caught Salmon','Fish',100,'2023-12-07'),(14,'Potatoes','Russet Potatoes','Vegetables',200,'2023-12-19'),(15,'Onions','Yellow Onions','Vegetables',100,'2023-12-22'),(16,'Rice','Basmati Rice','Grains',300,'2024-01-30'),(17,'Pasta','Italian Pasta','Grains',150,'2024-02-15'),(18,'Orange Juice','Fresh Orange Juice','Beverages',200,'2023-12-12'),(19,'Coffee','Arabica Coffee Beans','Beverages',100,'2024-03-10'),(20,'Chocolate','Dark Chocolate','Snacks',100,'2024-04-01'),(21,'Olive Oil','Extra Virgin Olive Oil','Pantry',100,'2024-05-01'),(22,'Butter','Unsalted Butter','Dairy',100,'2023-12-31'),(23,'Sugar','Granulated White Sugar','Pantry',150,'2024-06-01'),(24,'Flour','All-purpose Flour','Pantry',150,'2024-07-01'),(25,'Orange','Fresh Oranges','Fruits',100,'2023-12-20');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storeaddress`
--

DROP TABLE IF EXISTS `storeaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storeaddress` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `address_line1` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address_line2` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `postal_code` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storeaddress`
--

LOCK TABLES `storeaddress` WRITE;
/*!40000 ALTER TABLE `storeaddress` DISABLE KEYS */;
INSERT INTO `storeaddress` VALUES (1,'123 Tesco St',NULL,'Birmingham',NULL,NULL,'UK'),(2,'456 Aldi Ln',NULL,'Birmingham',NULL,NULL,'UK'),(3,'789 Lidl Rd',NULL,'Birmingham',NULL,NULL,'UK');
/*!40000 ALTER TABLE `storeaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storeproducts`
--

DROP TABLE IF EXISTS `storeproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storeproducts` (
  `store_product_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `store_id` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`store_product_id`),
  KEY `product_id` (`product_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `storeproducts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `storeproducts_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storeproducts`
--

LOCK TABLES `storeproducts` WRITE;
/*!40000 ALTER TABLE `storeproducts` DISABLE KEYS */;
INSERT INTO `storeproducts` VALUES (1,1,1,0.95),(2,2,1,1.20),(3,3,1,0.89),(4,4,1,2.50),(5,5,1,0.70),(6,6,1,1.10),(7,7,1,0.80),(8,8,1,1.20),(9,9,1,2.50),(10,10,1,1.75),(11,11,1,3.00),(12,12,1,4.00),(13,13,1,5.00),(14,14,1,0.90),(15,15,1,0.60),(16,21,1,1.50),(17,22,1,1.20),(18,23,1,2.00),(19,24,1,3.50),(20,25,1,2.50),(21,16,1,3.50),(22,17,1,2.20),(23,18,1,1.50),(24,19,1,1.20),(25,20,1,0.50),(26,1,2,0.90),(27,2,2,1.15),(28,3,2,0.85),(29,4,2,2.40),(30,5,2,0.65),(31,6,2,1.05),(32,7,2,0.75),(33,8,2,1.10),(34,9,2,2.30),(35,10,2,1.60),(36,11,2,2.90),(37,12,2,3.80),(38,13,2,4.90),(39,14,2,0.85),(40,15,2,0.55),(41,16,2,3.40),(42,17,2,2.10),(43,18,2,1.40),(44,19,2,1.10),(45,20,2,0.45),(46,21,2,1.40),(47,22,2,1.10),(48,23,2,1.90),(49,24,2,3.40),(50,25,2,2.40),(51,1,3,0.92),(52,2,3,1.18),(53,3,3,0.87),(54,4,3,2.45),(55,5,3,0.68),(56,6,3,1.08),(57,7,3,0.78),(58,8,3,1.15),(59,9,3,2.40),(60,10,3,1.70),(61,11,3,2.95),(62,12,3,3.85),(63,13,3,4.95),(64,14,3,0.88),(65,15,3,0.58),(66,16,3,3.45),(67,17,3,2.15),(68,18,3,1.45),(69,19,3,1.15),(70,20,3,0.48),(71,21,3,1.45),(72,22,3,1.15),(73,23,3,1.95),(74,24,3,3.45),(75,25,3,2.45);
/*!40000 ALTER TABLE `storeproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stores` (
  `store_id` int NOT NULL AUTO_INCREMENT,
  `store_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address_id` int DEFAULT NULL,
  PRIMARY KEY (`store_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `storeaddress` (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,'Tesco',1),(2,'Aldi',2),(3,'Lidl',3);
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userregistration`
--

DROP TABLE IF EXISTS `userregistration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userregistration` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_general_ci,
  `MembershipTypeID` int DEFAULT NULL,
  `password` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `MembershipTypeID` (`MembershipTypeID`),
  CONSTRAINT `userregistration_ibfk_1` FOREIGN KEY (`MembershipTypeID`) REFERENCES `membershiptypes` (`MembershipTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userregistration`
--

LOCK TABLES `userregistration` WRITE;
/*!40000 ALTER TABLE `userregistration` DISABLE KEYS */;
INSERT INTO `userregistration` VALUES (1,'Manas','Patil',NULL,NULL,NULL,NULL,NULL),(2,'manas','patil','4452627','manas@gmail.com',NULL,NULL,NULL),(3,'Max','Mendonca','12349876','max@gmail.com',NULL,NULL,NULL),(4,'violla','dsouza','000999888','violla@gmail.com',NULL,NULL,'manas@123'),(5,'Max','Mendonca','999888777','max123@gmail.com',NULL,NULL,'max@123');
/*!40000 ALTER TABLE `userregistration` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-11 22:29:33

-- Table structure for table product_ratings
CREATE TABLE product_ratings (
  rating_id INT NOT NULL AUTO_INCREMENT,
  product_id INT,
  user_id INT,
  rating INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (rating_id),
  FOREIGN KEY (product_id) REFERENCES product(product_id),
  FOREIGN KEY (user_id) REFERENCES userregistration(user_id)
);

-- Table structure for table `product_reviews`
CREATE TABLE `product_reviews` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT,
  `user_id` INT,
  `review` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`),
  FOREIGN KEY (`user_id`) REFERENCES `userregistration`(`user_id`)
);

ALTER TABLE product ADD COLUMN image_url_tesco VARCHAR(255);
ALTER TABLE product ADD COLUMN image_url_aldi VARCHAR(255);
ALTER TABLE product ADD COLUMN image_url_lidl VARCHAR(255);

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
