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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `action` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `details` text COLLATE utf8mb4_general_ci,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

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
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `quantity` int NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`basket_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `basketitems_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userregistration` (`user_id`),
  CONSTRAINT `basketitems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basketitems`
--

LOCK TABLES `basketitems` WRITE;
/*!40000 ALTER TABLE `basketitems` DISABLE KEYS */;
INSERT INTO `basketitems` VALUES (9,1,1,100.00,4,'2024-03-21 15:10:38'),(12,7,1,0.00,2,'2024-03-22 18:51:35');
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
  `returned` tinyint(1) NOT NULL DEFAULT '0',
  `admin_id` int DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `basket_id` (`basket_id`),
  KEY `user_id` (`user_id`),
  KEY `orders_ibfk_3` (`admin_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`basket_id`) REFERENCES `basket` (`basket_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `userregistration` (`user_id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`)
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
  `image_url_tesco` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image_url_aldi` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image_url_lidl` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Apples','Fresh Apples','Fruits',100,'2023-12-31',NULL,NULL,NULL),(2,'Pears','Juicy Pears','Fruits',100,'2023-12-31',NULL,NULL,NULL),(3,'Milk','2% Milk','Dairy',200,'2023-12-31',NULL,NULL,NULL),(4,'Cheese','Cheddar Cheese','Dairy',100,'2023-12-31',NULL,NULL,NULL),(5,'Carrots','Fresh Carrots','Vegetables',100,'2023-12-31',NULL,NULL,NULL),(6,'Bananas','Ripe Bananas','Fruits',150,'2023-12-20',NULL,NULL,NULL),(7,'Yogurt','Natural Yogurt','Dairy',200,'2023-12-15',NULL,NULL,NULL),(8,'Bread','Whole Wheat Bread','Bakery',100,'2023-12-10',NULL,NULL,NULL),(9,'Eggs','Free-range Eggs','Dairy',200,'2023-12-25',NULL,NULL,NULL),(10,'Tomatoes','Organic Tomatoes','Vegetables',100,'2023-12-18',NULL,NULL,NULL),(11,'Chicken Breast','Fresh Chicken Breast','Meat',100,'2023-12-08',NULL,NULL,NULL),(12,'Ground Beef','Lean Ground Beef','Meat',150,'2023-12-09',NULL,NULL,NULL),(13,'Salmon','Wild-caught Salmon','Fish',100,'2023-12-07',NULL,NULL,NULL),(14,'Potatoes','Russet Potatoes','Vegetables',200,'2023-12-19','http://res.cloudinary.com/dhtw6erpk/image/upload/v1711127063/relfxoitxwwbaj1ay8ye.jpg',NULL,NULL),(15,'Onions','Yellow Onions','Vegetables',100,'2023-12-22',NULL,NULL,NULL),(16,'Rice','Basmati Rice','Grains',300,'2024-01-30',NULL,NULL,NULL),(17,'Pasta','Italian Pasta','Grains',150,'2024-02-15',NULL,NULL,NULL),(18,'Orange Juice','Fresh Orange Juice','Beverages',200,'2023-12-12',NULL,NULL,NULL),(19,'Coffee','Arabica Coffee Beans','Beverages',100,'2024-03-10',NULL,NULL,NULL),(20,'Chocolate','Dark Chocolate','Snacks',100,'2024-04-01',NULL,NULL,NULL),(21,'Olive Oil','Extra Virgin Olive Oil','Pantry',100,'2024-05-01',NULL,NULL,NULL),(22,'Butter','Unsalted Butter','Dairy',100,'2023-12-31',NULL,NULL,NULL),(23,'Sugar','Granulated White Sugar','Pantry',150,'2024-06-01',NULL,NULL,NULL),(24,'Flour','All-purpose Flour','Pantry',150,'2024-07-01',NULL,NULL,NULL),(25,'Orange','Fresh Oranges','Fruits',100,'2023-12-20',NULL,NULL,NULL),(26,'Teabag','Tea','Fruits',100,'2023-12-31',NULL,NULL,NULL),(27,'Teabag','Tea','Fruits',100,'2023-12-31',NULL,NULL,NULL),(28,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(29,'Teabag','Tea','Fruits',100,'2023-12-31',NULL,NULL,NULL),(30,'Teabag','Tea','Fruits',100,'2023-12-31',NULL,NULL,NULL),(31,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(32,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(33,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(34,'Teabag','Tea','Fruits',100,'2023-12-31',NULL,NULL,NULL),(35,'Teabag','Tea','Fruits',100,'2023-12-31',NULL,NULL,NULL),(36,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(37,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(38,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(39,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(40,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(41,'Teabag','Tea','Fruits',100,'2023-12-31',NULL,NULL,NULL),(42,'Teabag','Tea','Fruits',100,'2023-12-31',NULL,NULL,NULL),(43,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(44,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(45,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(46,'Teabag','Tea','Fruits',100,'2023-12-31',NULL,NULL,NULL),(47,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(48,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(49,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(50,'Teabag','Tea','Fruits',100,'2023-12-31',NULL,NULL,NULL),(51,'Teabag','Tea','Fruits',100,'2023-12-31',NULL,NULL,NULL),(52,'Teabag','Tea','Fruits',100,'2023-12-31',NULL,NULL,NULL),(53,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_ratings`
--

DROP TABLE IF EXISTS `product_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_ratings` (
  `rating_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`rating_id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `product_ratings_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `product_ratings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `userregistration` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_ratings`
--

LOCK TABLES `product_ratings` WRITE;
/*!40000 ALTER TABLE `product_ratings` DISABLE KEYS */;
INSERT INTO `product_ratings` VALUES (1,1,7,4,'2024-03-21 15:10:38'),(17,2,7,3,'2024-03-21 15:10:38'),(18,3,7,4,'2024-03-21 15:10:38'),(19,4,7,2,'2024-03-21 15:10:38'),(20,5,7,5,'2024-03-21 15:10:38'),(21,6,7,5,'2024-03-21 15:10:38'),(22,7,7,1,'2024-03-21 15:10:38'),(23,8,7,3,'2024-03-21 15:10:38'),(24,9,7,1,'2024-03-21 15:10:38');
/*!40000 ALTER TABLE `product_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_reviews`
--

DROP TABLE IF EXISTS `product_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `review` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `userregistration` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_reviews`
--

LOCK TABLES `product_reviews` WRITE;
/*!40000 ALTER TABLE `product_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate_limiting`
--

DROP TABLE IF EXISTS `rate_limiting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rate_limiting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `endpoint` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `request_count` int DEFAULT '1',
  `last_request` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate_limiting`
--

LOCK TABLES `rate_limiting` WRITE;
/*!40000 ALTER TABLE `rate_limiting` DISABLE KEYS */;
/*!40000 ALTER TABLE `rate_limiting` ENABLE KEYS */;
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
  `description` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`store_product_id`),
  KEY `product_id` (`product_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `storeproducts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `storeproducts_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storeproducts`
--

LOCK TABLES `storeproducts` WRITE;
/*!40000 ALTER TABLE `storeproducts` DISABLE KEYS */;
INSERT INTO `storeproducts` VALUES (1,1,1,0.95,'Freshly picked, crunchy apples ideal for a nutritious snack or your baking delights. Sourced with care, exclusive to Tesco.'),(2,2,1,1.20,'Juicy pears, handpicked for their sweet flavor. Perfect for desserts or as a healthy snack. Only at Tesco.'),(3,3,1,0.89,'Creamy 2% milk, sourced directly from local farms. Freshness and quality in every bottle. Tesco’s dairy best.'),(4,4,1,2.50,'Rich and flavorful cheddar cheese, aged perfectly to enhance your meals. Exclusively available at Tesco.'),(5,5,1,0.70,'Crunchy, fresh carrots, harvested for their sweetness. Ideal for cooking or as a raw snack. Freshness guaranteed by Tesco.'),(6,6,1,1.10,'Ripe bananas with a sweet, creamy texture. Perfect for baking or as a quick snack. Brought to you by Tesco.'),(7,7,1,0.80,'Smooth, natural yogurt, made with the finest ingredients. A delicious, healthy treat. Tesco’s commitment to quality.'),(8,8,1,1.20,'Whole wheat bread, baked fresh every morning. Soft, nutritious, and perfect for sandwiches. Tesco’s bakery pride.'),(9,9,1,2.50,'Free-range eggs, from hens that roam freely. Rich in flavor and nutrition. Tesco’s choice for your healthy breakfast.'),(10,10,1,1.75,'Fresh, juicy tomatoes, organically grown. Bursting with flavor, perfect for salads or cooking. Tesco’s farm to your table.'),(11,11,1,3.00,'Tender chicken breast, sourced from farms with high welfare standards. Perfect for healthy meals. Tesco’s fresh poultry.'),(12,12,1,4.00,'Lean ground beef, high in protein and flavor. Ideal for burgers and meatballs. Quality meat from Tesco.'),(13,13,1,5.00,'Wild-caught salmon, rich in Omega-3. Fresh, flavorful, and perfect for grilling. Tesco’s seafood selection.'),(14,14,1,0.90,'Earthy russet potatoes, versatile and flavorful. Ideal for baking, mashing, or roasting. Tesco’s quality produce.'),(15,15,1,0.60,'Crisp, yellow onions, a staple for any kitchen. Adds flavor to any dish. Hand-selected by Tesco.'),(16,21,1,1.50,'Premium basmati rice, with a delicate aroma and fluffy texture. Ideal for exotic dishes. Tesco brings the world to your kitchen.'),(17,22,1,1.20,'Authentic Italian pasta, perfect al dente every time. Ideal for your favorite pasta dishes. Tesco’s selection.'),(18,23,1,2.00,'Fresh orange juice, squeezed from ripe oranges. Refreshing and rich in flavor. Start your day with Tesco’s best.'),(19,24,1,3.50,'Arabica coffee beans, rich in flavor and aroma. Perfect for your morning brew. Tesco’s premium coffee selection.'),(20,25,1,2.50,'Dark chocolate, rich and luxurious. Made with the finest cocoa beans. Indulge in Tesco’s sweet delight.'),(21,16,1,3.50,'Extra virgin olive oil, cold-pressed for the highest quality. Perfect for dressing or cooking. Tesco’s pantry essentials.'),(22,17,1,2.20,'Creamy, unsalted butter, made from the freshest cream. Ideal for baking or cooking. Rich flavor from Tesco.'),(23,18,1,1.50,'Fine granulated sugar, perfect for baking or sweetening. Tesco’s sweet staple for your pantry.'),(24,19,1,1.20,'All-purpose flour, milled for consistency and quality. Your baking essential, from Tesco.'),(25,20,1,0.50,'Fresh oranges, bursting with vitamin C. Juicy and sweet, perfect for juicing. Freshly picked for Tesco customers.'),(26,1,2,0.90,NULL),(27,2,2,1.15,NULL),(28,3,2,0.85,NULL),(29,4,2,2.40,NULL),(30,5,2,0.65,NULL),(31,6,2,1.05,NULL),(32,7,2,0.75,NULL),(33,8,2,1.10,NULL),(34,9,2,2.30,NULL),(35,10,2,1.60,NULL),(36,11,2,2.90,NULL),(37,12,2,3.80,NULL),(38,13,2,4.90,NULL),(39,14,2,0.85,NULL),(40,15,2,0.55,NULL),(41,16,2,3.40,NULL),(42,17,2,2.10,NULL),(43,18,2,1.40,NULL),(44,19,2,1.10,NULL),(45,20,2,0.45,NULL),(46,21,2,1.40,NULL),(47,22,2,1.10,NULL),(48,23,2,1.90,NULL),(49,24,2,3.40,NULL),(50,25,2,2.40,NULL),(51,1,3,0.92,NULL),(52,2,3,1.18,NULL),(53,3,3,0.87,NULL),(54,4,3,2.45,NULL),(55,5,3,0.68,NULL),(56,6,3,1.08,NULL),(57,7,3,0.78,NULL),(58,8,3,1.15,NULL),(59,9,3,2.40,NULL),(60,10,3,1.70,NULL),(61,11,3,2.95,NULL),(62,12,3,3.85,NULL),(63,13,3,4.95,NULL),(64,14,3,0.88,NULL),(65,15,3,0.58,NULL),(66,16,3,3.45,NULL),(67,17,3,2.15,NULL),(68,18,3,1.45,NULL),(69,19,3,1.15,NULL),(70,20,3,0.48,NULL),(71,21,3,1.45,NULL),(72,22,3,1.15,NULL),(73,23,3,1.95,NULL),(74,24,3,3.45,NULL),(75,25,3,2.45,NULL),(76,NULL,NULL,NULL,NULL),(77,26,NULL,0.00,NULL),(78,27,NULL,0.00,NULL),(79,28,NULL,0.00,NULL),(80,29,NULL,0.00,NULL),(81,30,NULL,0.00,NULL),(82,31,NULL,0.00,NULL),(83,32,NULL,0.00,NULL),(84,33,NULL,0.00,NULL),(85,34,NULL,0.00,NULL),(86,35,NULL,0.00,NULL),(87,36,NULL,0.00,NULL),(88,37,NULL,0.00,NULL),(89,38,NULL,0.00,NULL),(90,39,NULL,0.00,NULL),(91,40,NULL,0.00,NULL),(92,41,NULL,0.00,NULL),(93,42,NULL,0.00,NULL),(94,43,NULL,0.00,NULL),(95,44,NULL,0.00,NULL),(96,45,NULL,0.00,NULL),(97,46,NULL,0.00,NULL),(98,47,NULL,0.00,NULL),(99,48,NULL,0.00,NULL),(100,49,NULL,0.00,NULL),(101,50,NULL,0.00,NULL),(102,51,NULL,0.00,NULL),(103,52,NULL,0.00,NULL),(104,53,NULL,0.00,NULL);
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
  `password` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` varchar(1) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `MembershipTypeID` (`MembershipTypeID`),
  CONSTRAINT `userregistration_ibfk_1` FOREIGN KEY (`MembershipTypeID`) REFERENCES `membershiptypes` (`MembershipTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userregistration`
--

LOCK TABLES `userregistration` WRITE;
/*!40000 ALTER TABLE `userregistration` DISABLE KEYS */;
INSERT INTO `userregistration` VALUES (1,'Manas','Patil',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'manas','patil','4452627','manas@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL),(3,'Max','Mendonca','12349876','max@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL),(4,'violla','dsouza','000999888','violla@gmail.com',NULL,NULL,'manas@123',NULL,NULL,NULL),(5,'Max','Mendonca','999888777','max123@gmail.com',NULL,NULL,'max@123',NULL,NULL,NULL),(6,'manas','patil','112233','mp123@gmail.com',NULL,NULL,'$2b$10$elxFaHNZ06ZPA8E77d7pf.ZQQRBnQ/0fd.3wmRCSakO5TjezODGuq',NULL,NULL,'A'),(7,'max','mendonca','123456','max1@gmail.com',NULL,NULL,'$2b$10$xadP6n7TB8ekzFxvB/AgquJvV1iTL5eYFC5r7IIv.rD8s4XPzaNAK',NULL,NULL,'C');
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

-- Dump completed on 2024-03-22 18:57:46
