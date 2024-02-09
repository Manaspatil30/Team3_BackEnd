-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2024 at 01:28 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `unikartdatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `basket`
--

CREATE TABLE `basket` (
  `basket_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `basketitems`
--

CREATE TABLE `basketitems` (
  `basket_item_id` int(11) NOT NULL,
  `basket_id` int(11) DEFAULT NULL,
  `store_product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `membershiptypes`
--

CREATE TABLE `membershiptypes` (
  `MembershipTypeID` int(11) NOT NULL,
  `TypeName` varchar(255) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `membershiptypes`
--

INSERT INTO `membershiptypes` (`MembershipTypeID`, `TypeName`, `Description`, `Price`) VALUES
(1, 'Bronze', 'Bronze membership offers basic access to our product comparison tool, allowing customers to compare prices across different stores.', 10.00),
(2, 'Silver', 'Silver membership includes all the benefits of Bronze, plus access to exclusive deals and promotions, and a 5% discount on all orders.', 20.00),
(3, 'Gold', 'Gold membership provides all the benefits of Silver, in addition to free delivery for all orders, priority customer support, and a 10% discount on all orders.', 30.00);

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `order_detail_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `store_product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price_at_purchase` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `basket_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `delivery_address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `best_before` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `description`, `category`, `quantity`, `best_before`) VALUES
(1, 'Apples', 'Fresh Apples', 'Fruits', 100, '2023-12-31'),
(2, 'Pears', 'Juicy Pears', 'Fruits', 100, '2023-12-31'),
(3, 'Milk', '2% Milk', 'Dairy', 200, '2023-12-31'),
(4, 'Cheese', 'Cheddar Cheese', 'Dairy', 100, '2023-12-31'),
(5, 'Carrots', 'Fresh Carrots', 'Vegetables', 100, '2023-12-31'),
(6, 'Bananas', 'Ripe Bananas', 'Fruits', 150, '2023-12-20'),
(7, 'Yogurt', 'Natural Yogurt', 'Dairy', 200, '2023-12-15'),
(8, 'Bread', 'Whole Wheat Bread', 'Bakery', 100, '2023-12-10'),
(9, 'Eggs', 'Free-range Eggs', 'Dairy', 200, '2023-12-25'),
(10, 'Tomatoes', 'Organic Tomatoes', 'Vegetables', 100, '2023-12-18'),
(11, 'Chicken Breast', 'Fresh Chicken Breast', 'Meat', 100, '2023-12-08'),
(12, 'Ground Beef', 'Lean Ground Beef', 'Meat', 150, '2023-12-09'),
(13, 'Salmon', 'Wild-caught Salmon', 'Fish', 100, '2023-12-07'),
(14, 'Potatoes', 'Russet Potatoes', 'Vegetables', 200, '2023-12-19'),
(15, 'Onions', 'Yellow Onions', 'Vegetables', 100, '2023-12-22'),
(16, 'Rice', 'Basmati Rice', 'Grains', 300, '2024-01-30'),
(17, 'Pasta', 'Italian Pasta', 'Grains', 150, '2024-02-15'),
(18, 'Orange Juice', 'Fresh Orange Juice', 'Beverages', 200, '2023-12-12'),
(19, 'Coffee', 'Arabica Coffee Beans', 'Beverages', 100, '2024-03-10'),
(20, 'Chocolate', 'Dark Chocolate', 'Snacks', 100, '2024-04-01'),
(21, 'Olive Oil', 'Extra Virgin Olive Oil', 'Pantry', 100, '2024-05-01'),
(22, 'Butter', 'Unsalted Butter', 'Dairy', 100, '2023-12-31'),
(23, 'Sugar', 'Granulated White Sugar', 'Pantry', 150, '2024-06-01'),
(24, 'Flour', 'All-purpose Flour', 'Pantry', 150, '2024-07-01'),
(25, 'Orange', 'Fresh Oranges', 'Fruits', 100, '2023-12-20');

-- --------------------------------------------------------

--
-- Table structure for table `storeaddress`
--

CREATE TABLE `storeaddress` (
  `address_id` int(11) NOT NULL,
  `address_line1` varchar(255) DEFAULT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `storeaddress`
--

INSERT INTO `storeaddress` (`address_id`, `address_line1`, `address_line2`, `city`, `state`, `postal_code`, `country`) VALUES
(1, '123 Tesco St', NULL, 'Birmingham', NULL, NULL, 'UK'),
(2, '456 Aldi Ln', NULL, 'Birmingham', NULL, NULL, 'UK'),
(3, '789 Lidl Rd', NULL, 'Birmingham', NULL, NULL, 'UK');

-- --------------------------------------------------------

--
-- Table structure for table `storeproducts`
--

CREATE TABLE `storeproducts` (
  `store_product_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `storeproducts`
--

INSERT INTO `storeproducts` (`store_product_id`, `product_id`, `store_id`, `price`) VALUES
(1, 1, 1, 0.95),
(2, 2, 1, 1.20),
(3, 3, 1, 0.89),
(4, 4, 1, 2.50),
(5, 5, 1, 0.70),
(6, 6, 1, 1.10),
(7, 7, 1, 0.80),
(8, 8, 1, 1.20),
(9, 9, 1, 2.50),
(10, 10, 1, 1.75),
(11, 11, 1, 3.00),
(12, 12, 1, 4.00),
(13, 13, 1, 5.00),
(14, 14, 1, 0.90),
(15, 15, 1, 0.60),
(16, 21, 1, 1.50),
(17, 22, 1, 1.20),
(18, 23, 1, 2.00),
(19, 24, 1, 3.50),
(20, 25, 1, 2.50),
(21, 16, 1, 3.50),
(22, 17, 1, 2.20),
(23, 18, 1, 1.50),
(24, 19, 1, 1.20),
(25, 20, 1, 0.50),
(26, 1, 2, 0.90),
(27, 2, 2, 1.15),
(28, 3, 2, 0.85),
(29, 4, 2, 2.40),
(30, 5, 2, 0.65),
(31, 6, 2, 1.05),
(32, 7, 2, 0.75),
(33, 8, 2, 1.10),
(34, 9, 2, 2.30),
(35, 10, 2, 1.60),
(36, 11, 2, 2.90),
(37, 12, 2, 3.80),
(38, 13, 2, 4.90),
(39, 14, 2, 0.85),
(40, 15, 2, 0.55),
(41, 16, 2, 3.40),
(42, 17, 2, 2.10),
(43, 18, 2, 1.40),
(44, 19, 2, 1.10),
(45, 20, 2, 0.45),
(46, 21, 2, 1.40),
(47, 22, 2, 1.10),
(48, 23, 2, 1.90),
(49, 24, 2, 3.40),
(50, 25, 2, 2.40),
(51, 1, 3, 0.92),
(52, 2, 3, 1.18),
(53, 3, 3, 0.87),
(54, 4, 3, 2.45),
(55, 5, 3, 0.68),
(56, 6, 3, 1.08),
(57, 7, 3, 0.78),
(58, 8, 3, 1.15),
(59, 9, 3, 2.40),
(60, 10, 3, 1.70),
(61, 11, 3, 2.95),
(62, 12, 3, 3.85),
(63, 13, 3, 4.95),
(64, 14, 3, 0.88),
(65, 15, 3, 0.58),
(66, 16, 3, 3.45),
(67, 17, 3, 2.15),
(68, 18, 3, 1.45),
(69, 19, 3, 1.15),
(70, 20, 3, 0.48),
(71, 21, 3, 1.45),
(72, 22, 3, 1.15),
(73, 23, 3, 1.95),
(74, 24, 3, 3.45),
(75, 25, 3, 2.45);

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `store_id` int(11) NOT NULL,
  `store_name` varchar(255) DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`store_id`, `store_name`, `address_id`) VALUES
(1, 'Tesco', 1),
(2, 'Aldi', 2),
(3, 'Lidl', 3);

-- --------------------------------------------------------

--
-- Table structure for table `userregistration`
--

CREATE TABLE `userregistration` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `MembershipTypeID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `ratings_and_reviews`
CREATE TABLE `ratings_and_reviews` (
  `review_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `review_text` text DEFAULT NULL,
  `review_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `ratings_and_reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userregistration` (`user_id`),
  CONSTRAINT `ratings_and_reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Indexes for dumped tables
--

--
-- Indexes for table `basket`
--
ALTER TABLE `basket`
  ADD PRIMARY KEY (`basket_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `basketitems`
--
ALTER TABLE `basketitems`
  ADD PRIMARY KEY (`basket_item_id`),
  ADD KEY `basket_id` (`basket_id`),
  ADD KEY `store_product_id` (`store_product_id`);

--
-- Indexes for table `membershiptypes`
--
ALTER TABLE `membershiptypes`
  ADD PRIMARY KEY (`MembershipTypeID`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`order_detail_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `store_product_id` (`store_product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `basket_id` (`basket_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `storeaddress`
--
ALTER TABLE `storeaddress`
  ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `storeproducts`
--
ALTER TABLE `storeproducts`
  ADD PRIMARY KEY (`store_product_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `store_id` (`store_id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`store_id`),
  ADD KEY `address_id` (`address_id`);

--
-- Indexes for table `userregistration`
--
ALTER TABLE `userregistration`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `MembershipTypeID` (`MembershipTypeID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `basket`
--
ALTER TABLE `basket`
  MODIFY `basket_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `basketitems`
--
ALTER TABLE `basketitems`
  MODIFY `basket_item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `membershiptypes`
--
ALTER TABLE `membershiptypes`
  MODIFY `MembershipTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `storeaddress`
--
ALTER TABLE `storeaddress`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `storeproducts`
--
ALTER TABLE `storeproducts`
  MODIFY `store_product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `store_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `userregistration`
--
ALTER TABLE `userregistration`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `basket`
--
ALTER TABLE `basket`
  ADD CONSTRAINT `basket_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userregistration` (`user_id`);

--
-- Constraints for table `basketitems`
--
ALTER TABLE `basketitems`
  ADD CONSTRAINT `basketitems_ibfk_1` FOREIGN KEY (`basket_id`) REFERENCES `basket` (`basket_id`),
  ADD CONSTRAINT `basketitems_ibfk_2` FOREIGN KEY (`store_product_id`) REFERENCES `storeproducts` (`store_product_id`);

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`store_product_id`) REFERENCES `storeproducts` (`store_product_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`basket_id`) REFERENCES `basket` (`basket_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `userregistration` (`user_id`);

--
-- Constraints for table `storeproducts`
--
ALTER TABLE `storeproducts`
  ADD CONSTRAINT `storeproducts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `storeproducts_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`);

--
-- Constraints for table `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `storeaddress` (`address_id`);

--
-- Constraints for table `userregistration`
--
ALTER TABLE `userregistration`
  ADD CONSTRAINT `userregistration_ibfk_1` FOREIGN KEY (`MembershipTypeID`) REFERENCES `membershiptypes` (`MembershipTypeID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
