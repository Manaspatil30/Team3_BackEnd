-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 23, 2024 at 06:06 PM
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
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
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
  `quantity` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `store_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `basketitems`
--

INSERT INTO `basketitems` (`basket_id`, `user_id`, `product_id`, `price`, `quantity`, `updated_at`, `store_id`) VALUES
(9, 1, 1, 100.00, 4, '2024-03-23 17:00:28', 1),
(12, 1, 2, 0.00, 7, '2024-03-23 17:00:28', 1);

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
  `delivery_address` text DEFAULT NULL,
  `returned` tinyint(1) NOT NULL DEFAULT 0,
  `admin_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
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
  `best_before` date DEFAULT NULL,
  `image_url_tesco` varchar(255) DEFAULT NULL,
  `image_url_aldi` varchar(255) DEFAULT NULL,
  `image_url_lidl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `description`, `category`, `best_before`, `image_url_tesco`, `image_url_aldi`, `image_url_lidl`) VALUES
(1, 'Apples', 'Fresh Apples', 'Fruits', '2023-12-31', NULL, NULL, NULL),
(2, 'Pears', 'Juicy Pears', 'Fruits', '2023-12-31', NULL, NULL, NULL),
(3, 'Milk', '2% Milk', 'Dairy', '2023-12-31', NULL, NULL, NULL),
(4, 'Cheese', 'Cheddar Cheese', 'Dairy', '2023-12-31', NULL, NULL, NULL),
(5, 'Carrots', 'Fresh Carrots', 'Vegetables', '2023-12-31', NULL, NULL, NULL),
(6, 'Bananas', 'Ripe Bananas', 'Fruits', '2023-12-20', NULL, NULL, NULL),
(7, 'Yogurt', 'Natural Yogurt', 'Dairy', '2023-12-15', NULL, NULL, NULL),
(8, 'Bread', 'Whole Wheat Bread', 'Bakery', '2023-12-10', NULL, NULL, NULL),
(9, 'Eggs', 'Free-range Eggs', 'Dairy', '2023-12-25', NULL, NULL, NULL),
(10, 'Tomatoes', 'Organic Tomatoes', 'Vegetables', '2023-12-18', NULL, NULL, NULL),
(11, 'Chicken Breast', 'Fresh Chicken Breast', 'Meat', '2023-12-08', NULL, NULL, NULL),
(12, 'Ground Beef', 'Lean Ground Beef', 'Meat', '2023-12-09', NULL, NULL, NULL),
(13, 'Salmon', 'Wild-caught Salmon', 'Fish', '2023-12-07', NULL, NULL, NULL),
(14, 'Potatoes', 'Russet Potatoes', 'Vegetables', '2023-12-19', NULL, NULL, NULL),
(15, 'Onions', 'Yellow Onions', 'Vegetables', '2023-12-22', NULL, NULL, NULL),
(16, 'Rice', 'Basmati Rice', 'Grains', '2024-01-30', NULL, NULL, NULL),
(17, 'Pasta', 'Italian Pasta', 'Grains', '2024-02-15', NULL, NULL, NULL),
(18, 'Orange Juice', 'Fresh Orange Juice', 'Beverages', '2023-12-12', NULL, NULL, NULL),
(19, 'Coffee', 'Arabica Coffee Beans', 'Beverages', '2024-03-10', NULL, NULL, NULL),
(20, 'Chocolate', 'Dark Chocolate', 'Snacks', '2024-04-01', NULL, NULL, NULL),
(21, 'Olive Oil', 'Extra Virgin Olive Oil', 'Pantry', '2024-05-01', NULL, NULL, NULL),
(22, 'Butter', 'Unsalted Butter', 'Dairy', '2023-12-31', NULL, NULL, NULL),
(23, 'Sugar', 'Granulated White Sugar', 'Pantry', '2024-06-01', NULL, NULL, NULL),
(24, 'Flour', 'All-purpose Flour', 'Pantry', '2024-07-01', NULL, NULL, NULL),
(25, 'Orange', 'Fresh Oranges', 'Fruits', '2023-12-20', NULL, NULL, NULL),
(26, 'Teabag', 'Tea', 'Fruits', '2023-12-31', NULL, NULL, NULL),
(27, 'Teabag', 'Tea', 'Fruits', '2023-12-31', NULL, NULL, NULL),
(28, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(29, 'Teabag', 'Tea', 'Fruits', '2023-12-31', NULL, NULL, NULL),
(30, 'Teabag', 'Tea', 'Fruits', '2023-12-31', NULL, NULL, NULL),
(31, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(32, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(33, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(34, 'Teabag', 'Tea', 'Fruits', '2023-12-31', NULL, NULL, NULL),
(35, 'Teabag', 'Tea', 'Fruits', '2023-12-31', NULL, NULL, NULL),
(36, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(37, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(38, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(39, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(40, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(41, 'Teabag', 'Tea', 'Fruits', '2023-12-31', NULL, NULL, NULL),
(42, 'Teabag', 'Tea', 'Fruits', '2023-12-31', NULL, NULL, NULL),
(43, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(44, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(45, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(46, 'Teabag', 'Tea', 'Fruits', '2023-12-31', NULL, NULL, NULL),
(47, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(48, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(49, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(50, 'Teabag', 'Tea', 'Fruits', '2023-12-31', NULL, NULL, NULL),
(51, 'Teabag', 'Tea', 'Fruits', '2023-12-31', NULL, NULL, NULL),
(52, 'Teabag', 'Tea', 'Fruits', '2023-12-31', NULL, NULL, NULL),
(53, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
-- Table structure for table `rate_limiting`
--

CREATE TABLE `rate_limiting` (
  `id` int(11) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `endpoint` varchar(255) DEFAULT NULL,
  `request_count` int(11) DEFAULT 1,
  `last_request` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
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
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(255) NOT NULL DEFAULT 100
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `storeproducts`
--

INSERT INTO `storeproducts` (`store_product_id`, `product_id`, `store_id`, `price`, `description`, `quantity`) VALUES
(1, 1, 1, 0.95, 'Freshly picked, crunchy apples ideal for a nutritious snack or your baking delights. Sourced with care, exclusive to Tesco.', 100),
(2, 2, 1, 1.20, 'Juicy pears, handpicked for their sweet flavor. Perfect for desserts or as a healthy snack. Only at Tesco.', 99),
(3, 3, 1, 0.89, 'Creamy 2% milk, sourced directly from local farms. Freshness and quality in every bottle. Tesco’s dairy best.', 100),
(4, 4, 1, 2.50, 'Rich and flavorful cheddar cheese, aged perfectly to enhance your meals. Exclusively available at Tesco.', 100),
(5, 5, 1, 0.70, 'Crunchy, fresh carrots, harvested for their sweetness. Ideal for cooking or as a raw snack. Freshness guaranteed by Tesco.', 100),
(6, 6, 1, 1.10, 'Ripe bananas with a sweet, creamy texture. Perfect for baking or as a quick snack. Brought to you by Tesco.', 100),
(7, 7, 1, 0.80, 'Smooth, natural yogurt, made with the finest ingredients. A delicious, healthy treat. Tesco’s commitment to quality.', 100),
(8, 8, 1, 1.20, 'Whole wheat bread, baked fresh every morning. Soft, nutritious, and perfect for sandwiches. Tesco’s bakery pride.', 100),
(9, 9, 1, 2.50, 'Free-range eggs, from hens that roam freely. Rich in flavor and nutrition. Tesco’s choice for your healthy breakfast.', 100),
(10, 10, 1, 1.75, 'Fresh, juicy tomatoes, organically grown. Bursting with flavor, perfect for salads or cooking. Tesco’s farm to your table.', 100),
(11, 11, 1, 3.00, 'Tender chicken breast, sourced from farms with high welfare standards. Perfect for healthy meals. Tesco’s fresh poultry.', 100),
(12, 12, 1, 4.00, 'Lean ground beef, high in protein and flavor. Ideal for burgers and meatballs. Quality meat from Tesco.', 100),
(13, 13, 1, 5.00, 'Wild-caught salmon, rich in Omega-3. Fresh, flavorful, and perfect for grilling. Tesco’s seafood selection.', 100),
(14, 14, 1, 0.90, 'Earthy russet potatoes, versatile and flavorful. Ideal for baking, mashing, or roasting. Tesco’s quality produce.', 100),
(15, 15, 1, 0.60, 'Crisp, yellow onions, a staple for any kitchen. Adds flavor to any dish. Hand-selected by Tesco.', 100),
(16, 21, 1, 1.50, 'Premium basmati rice, with a delicate aroma and fluffy texture. Ideal for exotic dishes. Tesco brings the world to your kitchen.', 100),
(17, 22, 1, 1.20, 'Authentic Italian pasta, perfect al dente every time. Ideal for your favorite pasta dishes. Tesco’s selection.', 100),
(18, 23, 1, 2.00, 'Fresh orange juice, squeezed from ripe oranges. Refreshing and rich in flavor. Start your day with Tesco’s best.', 100),
(19, 24, 1, 3.50, 'Arabica coffee beans, rich in flavor and aroma. Perfect for your morning brew. Tesco’s premium coffee selection.', 100),
(20, 25, 1, 2.50, 'Dark chocolate, rich and luxurious. Made with the finest cocoa beans. Indulge in Tesco’s sweet delight.', 100),
(21, 16, 1, 3.50, 'Extra virgin olive oil, cold-pressed for the highest quality. Perfect for dressing or cooking. Tesco’s pantry essentials.', 100),
(22, 17, 1, 2.20, 'Creamy, unsalted butter, made from the freshest cream. Ideal for baking or cooking. Rich flavor from Tesco.', 100),
(23, 18, 1, 1.50, 'Fine granulated sugar, perfect for baking or sweetening. Tesco’s sweet staple for your pantry.', 100),
(24, 19, 1, 1.20, 'All-purpose flour, milled for consistency and quality. Your baking essential, from Tesco.', 100),
(25, 20, 1, 0.50, 'Fresh oranges, bursting with vitamin C. Juicy and sweet, perfect for juicing. Freshly picked for Tesco customers.', 100),
(26, 1, 2, 0.90, NULL, 100),
(27, 2, 2, 1.15, NULL, 99),
(28, 3, 2, 0.85, NULL, 100),
(29, 4, 2, 2.40, NULL, 100),
(30, 5, 2, 0.65, NULL, 100),
(31, 6, 2, 1.05, NULL, 100),
(32, 7, 2, 0.75, NULL, 100),
(33, 8, 2, 1.10, NULL, 100),
(34, 9, 2, 2.30, NULL, 100),
(35, 10, 2, 1.60, NULL, 100),
(36, 11, 2, 2.90, NULL, 100),
(37, 12, 2, 3.80, NULL, 100),
(38, 13, 2, 4.90, NULL, 100),
(39, 14, 2, 0.85, NULL, 100),
(40, 15, 2, 0.55, NULL, 100),
(41, 16, 2, 3.40, NULL, 100),
(42, 17, 2, 2.10, NULL, 100),
(43, 18, 2, 1.40, NULL, 100),
(44, 19, 2, 1.10, NULL, 100),
(45, 20, 2, 0.45, NULL, 100),
(46, 21, 2, 1.40, NULL, 100),
(47, 22, 2, 1.10, NULL, 100),
(48, 23, 2, 1.90, NULL, 100),
(49, 24, 2, 3.40, NULL, 100),
(50, 25, 2, 2.40, NULL, 100),
(51, 1, 3, 0.92, NULL, 100),
(52, 2, 3, 1.18, NULL, 99),
(53, 3, 3, 0.87, NULL, 100),
(54, 4, 3, 2.45, NULL, 100),
(55, 5, 3, 0.68, NULL, 100),
(56, 6, 3, 1.08, NULL, 100),
(57, 7, 3, 0.78, NULL, 100),
(58, 8, 3, 1.15, NULL, 100),
(59, 9, 3, 2.40, NULL, 100),
(60, 10, 3, 1.70, NULL, 100),
(61, 11, 3, 2.95, NULL, 100),
(62, 12, 3, 3.85, NULL, 100),
(63, 13, 3, 4.95, NULL, 100),
(64, 14, 3, 0.88, NULL, 100),
(65, 15, 3, 0.58, NULL, 100),
(66, 16, 3, 3.45, NULL, 100),
(67, 17, 3, 2.15, NULL, 100),
(68, 18, 3, 1.45, NULL, 100),
(69, 19, 3, 1.15, NULL, 100),
(70, 20, 3, 0.48, NULL, 100),
(71, 21, 3, 1.45, NULL, 100),
(72, 22, 3, 1.15, NULL, 100),
(73, 23, 3, 1.95, NULL, 100),
(74, 24, 3, 3.45, NULL, 100),
(75, 25, 3, 2.45, NULL, 100),
(76, NULL, NULL, NULL, NULL, 100),
(77, 26, NULL, 0.00, NULL, 100),
(78, 27, NULL, 0.00, NULL, 100),
(79, 28, NULL, 0.00, NULL, 100),
(80, 29, NULL, 0.00, NULL, 100),
(81, 30, NULL, 0.00, NULL, 100),
(82, 31, NULL, 0.00, NULL, 100),
(83, 32, NULL, 0.00, NULL, 100),
(84, 33, NULL, 0.00, NULL, 100),
(85, 34, NULL, 0.00, NULL, 100),
(86, 35, NULL, 0.00, NULL, 100),
(87, 36, NULL, 0.00, NULL, 100),
(88, 37, NULL, 0.00, NULL, 100),
(89, 38, NULL, 0.00, NULL, 100),
(90, 39, NULL, 0.00, NULL, 100),
(91, 40, NULL, 0.00, NULL, 100),
(92, 41, NULL, 0.00, NULL, 100),
(93, 42, NULL, 0.00, NULL, 100),
(94, 43, NULL, 0.00, NULL, 100),
(95, 44, NULL, 0.00, NULL, 100),
(96, 45, NULL, 0.00, NULL, 100),
(97, 46, NULL, 0.00, NULL, 100),
(98, 47, NULL, 0.00, NULL, 100),
(99, 48, NULL, 0.00, NULL, 100),
(100, 49, NULL, 0.00, NULL, 100),
(101, 50, NULL, 0.00, NULL, 100),
(102, 51, NULL, 0.00, NULL, 100),
(103, 52, NULL, 0.00, NULL, 100),
(104, 53, NULL, 0.00, NULL, 100);

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
(5, 'Max', 'Mendonca', '999888777', 'max123@gmail.com', NULL, NULL, 'max@123', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `user_id` (`user_id`),
  ADD KEY `orders_ibfk_3` (`admin_id`);

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
-- Indexes for table `rate_limiting`
--
ALTER TABLE `rate_limiting`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `basket`
--
ALTER TABLE `basket`
  MODIFY `basket_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `basketitems`
--
ALTER TABLE `basketitems`
  MODIFY `basket_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

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
-- AUTO_INCREMENT for table `rate_limiting`
--
ALTER TABLE `rate_limiting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `storeaddress`
--
ALTER TABLE `storeaddress`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `storeproducts`
--
ALTER TABLE `storeproducts`
  MODIFY `store_product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `store_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `userregistration`
--
ALTER TABLE `userregistration`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `userregistration` (`user_id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`);

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
