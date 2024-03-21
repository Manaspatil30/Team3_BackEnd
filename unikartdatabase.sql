-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2024 at 10:37 PM
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
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `basket_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `basketitems`
--

INSERT INTO `basketitems` (`basket_id`, `user_id`, `product_id`, `price`, `quantity`) VALUES
(9, 1, 1, 100.00, 4);

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
(1, 'Unikart Plus', 'Discounted delivery charges with zero convenience fees', 10.00);

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
  `best_before` date DEFAULT NULL,
  `image_url_tesco` varchar(255) DEFAULT NULL,
  `image_url_aldi` varchar(255) DEFAULT NULL,
  `image_url_lidl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `description`, `category`, `quantity`, `best_before`, `image_url_tesco`, `image_url_aldi`, `image_url_lidl`) VALUES
(1, 'Apples', 'Fresh Apples', 'Fruits', 100, '2023-12-31', NULL, NULL, NULL),
(2, 'Pears', 'Juicy Pears', 'Fruits', 100, '2023-12-31', NULL, NULL, NULL),
(3, 'Milk', '2% Milk', 'Dairy', 200, '2023-12-31', NULL, NULL, NULL),
(4, 'Cheese', 'Cheddar Cheese', 'Dairy', 100, '2023-12-31', NULL, NULL, NULL),
(5, 'Carrots', 'Fresh Carrots', 'Vegetables', 100, '2023-12-31', NULL, NULL, NULL),
(6, 'Bananas', 'Ripe Bananas', 'Fruits', 150, '2023-12-20', NULL, NULL, NULL),
(7, 'Yogurt', 'Natural Yogurt', 'Dairy', 200, '2023-12-15', NULL, NULL, NULL),
(8, 'Bread', 'Whole Wheat Bread', 'Bakery', 100, '2023-12-10', NULL, NULL, NULL),
(9, 'Eggs', 'Free-range Eggs', 'Dairy', 200, '2023-12-25', NULL, NULL, NULL),
(10, 'Tomatoes', 'Organic Tomatoes', 'Vegetables', 100, '2023-12-18', NULL, NULL, NULL),
(11, 'Chicken Breast', 'Fresh Chicken Breast', 'Meat', 100, '2023-12-08', NULL, NULL, NULL),
(12, 'Ground Beef', 'Lean Ground Beef', 'Meat', 150, '2023-12-09', NULL, NULL, NULL),
(13, 'Salmon', 'Wild-caught Salmon', 'Fish', 100, '2023-12-07', NULL, NULL, NULL),
(14, 'Potatoes', 'Russet Potatoes', 'Vegetables', 200, '2023-12-19', NULL, NULL, NULL),
(15, 'Onions', 'Yellow Onions', 'Vegetables', 100, '2023-12-22', NULL, NULL, NULL),
(16, 'Rice', 'Basmati Rice', 'Grains', 300, '2024-01-30', NULL, NULL, NULL),
(17, 'Pasta', 'Italian Pasta', 'Grains', 150, '2024-02-15', NULL, NULL, NULL),
(18, 'Orange Juice', 'Fresh Orange Juice', 'Beverages', 200, '2023-12-12', NULL, NULL, NULL),
(19, 'Coffee', 'Arabica Coffee Beans', 'Beverages', 100, '2024-03-10', NULL, NULL, NULL),
(20, 'Chocolate', 'Dark Chocolate', 'Snacks', 100, '2024-04-01', NULL, NULL, NULL),
(21, 'Olive Oil', 'Extra Virgin Olive Oil', 'Pantry', 100, '2024-05-01', NULL, NULL, NULL),
(22, 'Butter', 'Unsalted Butter', 'Dairy', 100, '2023-12-31', NULL, NULL, NULL),
(23, 'Sugar', 'Granulated White Sugar', 'Pantry', 150, '2024-06-01', NULL, NULL, NULL),
(24, 'Flour', 'All-purpose Flour', 'Pantry', 150, '2024-07-01', NULL, NULL, NULL),
(25, 'Orange', 'Fresh Oranges', 'Fruits', 100, '2023-12-20', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_ratings`
--

CREATE TABLE `product_ratings` (
  `rating_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_reviews`
--

CREATE TABLE `product_reviews` (
  `review_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `review` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `MembershipTypeID` int(11) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userregistration`
--

INSERT INTO `userregistration` (`user_id`, `first_name`, `last_name`, `phone_number`, `email`, `address`, `MembershipTypeID`, `password`, `start_date`, `end_date`, `status`) VALUES
(1, 'Manas', 'Patil', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'manas', 'patil', '4452627', 'manas@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Max', 'Mendonca', '12349876', 'max@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'violla', 'dsouza', '000999888', 'violla@gmail.com', NULL, NULL, 'manas@123', NULL, NULL, NULL),
(5, 'John', 'Doe', '123456789', 'john.doe@example.com', '123 Main St', NULL, '$2b$10$ST951jwYa9kk4uz4mmoneurHn/AZaT8.AZJ/SI', '2022-01-01', '2023-01-01', NULL),
(6, 'John', 'Doe', '123456789', 'john.doe@example.com', '123 Main St', 1, '$2b$10$CHT0KCxNwXSFfm1StNQh.OiiJy/9Z5kdRvn9kQ', NULL, NULL, NULL),
(7, 'John', 'Doe', '123456789', 'john.doe@example.com', '123 Main St', 1, '$2b$10$L3Sd0mPjRkbLtg2Oz3wbleg03DT3dSF1BXRMDu', NULL, NULL, NULL),
(8, 'John', 'Doe', '123456789', 'john.doe@example.com', '123 Main St', 1, '$2b$10$b7/QcO5P6eO8fh2FpVc6Je9tt8zBl8xOPc7bki', NULL, NULL, NULL),
(9, 'John', 'Doe', '123456789', 'max123', '123 Main St', 1, '$2b$10$7TGTSS9ZMdTa3Cd5YVMfVus6ewW6hISkRpyjR4', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`);

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
  ADD PRIMARY KEY (`basket_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

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
-- Indexes for table `product_ratings`
--
ALTER TABLE `product_ratings`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

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
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `basket`
--
ALTER TABLE `basket`
  MODIFY `basket_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `basketitems`
--
ALTER TABLE `basketitems`
  MODIFY `basket_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
-- AUTO_INCREMENT for table `product_ratings`
--
ALTER TABLE `product_ratings`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
  ADD CONSTRAINT `basketitems_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userregistration` (`user_id`),
  ADD CONSTRAINT `basketitems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

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
-- Constraints for table `product_ratings`
--
ALTER TABLE `product_ratings`
  ADD CONSTRAINT `product_ratings_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `product_ratings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `userregistration` (`user_id`);

--
-- Constraints for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `userregistration` (`user_id`);

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
