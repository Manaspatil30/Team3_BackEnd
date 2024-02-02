-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2024 at 11:50 AM
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
-- Database: `ukart`
--

-- --------------------------------------------------------

--
-- Table structure for table `aldi`
--

CREATE TABLE `aldi` (
  `product_id` int(11) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aldi`
--

INSERT INTO `aldi` (`product_id`, `price`, `location`) VALUES
(101, 0.95, 'Aldi Birmingham'),
(102, 1.15, 'Aldi Birmingham'),
(103, 3.40, 'Aldi Birmingham'),
(104, 0.28, 'Aldi Birmingham'),
(201, 0.85, 'Aldi Birmingham'),
(202, 2.40, 'Aldi Birmingham'),
(203, 0.95, 'Aldi Birmingham'),
(301, 0.65, 'Aldi Birmingham'),
(302, 0.95, 'Aldi Birmingham'),
(303, 0.75, 'Aldi Birmingham');

-- --------------------------------------------------------

--
-- Table structure for table `lidl`
--

CREATE TABLE `lidl` (
  `product_id` int(11) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lidl`
--

INSERT INTO `lidl` (`product_id`, `price`, `location`) VALUES
(101, 0.97, 'Lidl Birmingham'),
(102, 1.18, 'Lidl Birmingham'),
(103, 3.45, 'Lidl Birmingham'),
(104, 0.29, 'Lidl Birmingham'),
(201, 0.87, 'Lidl Birmingham'),
(202, 2.45, 'Lidl Birmingham'),
(203, 0.97, 'Lidl Birmingham'),
(301, 0.68, 'Lidl Birmingham'),
(302, 0.98, 'Lidl Birmingham'),
(303, 0.78, 'Lidl Birmingham');

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

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `best_before` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `description`, `category`, `brand`, `quantity`, `best_before`) VALUES
(101, 'Apples', 'Fresh Apples', 'Fruits', 'Generic', 100, '2023-12-31'),
(102, 'Pears', 'Fresh Pears', 'Fruits', 'Generic', 100, '2023-12-31'),
(103, 'Watermelon', 'Fresh Watermelon', 'Fruits', 'Generic', 50, '2023-12-31'),
(104, 'Banana', 'Fresh Banana', 'Fruits', 'Generic', 100, '2023-12-31'),
(201, 'Milk', 'Dairy Milk', 'Dairy', 'Generic', 200, '2023-12-31'),
(202, 'Cheese', 'Cheddar Cheese', 'Dairy', 'Generic', 100, '2023-12-31'),
(203, 'Yogurt', 'Greek Yogurt', 'Dairy', 'Generic', 150, '2023-12-31'),
(301, 'Carrots', 'Fresh Carrots', 'Vegetables', 'Generic', 100, '2023-12-31'),
(302, 'Broccoli', 'Fresh Broccoli', 'Vegetables', 'Generic', 100, '2023-12-31'),
(303, 'Potato', 'Fresh Potato', 'Vegetables', 'Generic', 200, '2023-12-31');

-- --------------------------------------------------------

--
-- Table structure for table `tesco`
--

CREATE TABLE `tesco` (
  `product_id` int(11) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tesco`
--

INSERT INTO `tesco` (`product_id`, `price`, `location`) VALUES
(101, 0.99, 'Tesco Birmingham'),
(102, 1.20, 'Tesco Birmingham'),
(103, 3.50, 'Tesco Birmingham'),
(104, 0.30, 'Tesco Birmingham'),
(201, 0.89, 'Tesco Birmingham'),
(202, 2.50, 'Tesco Birmingham'),
(203, 0.99, 'Tesco Birmingham'),
(301, 0.70, 'Tesco Birmingham'),
(302, 1.00, 'Tesco Birmingham'),
(303, 0.80, 'Tesco Birmingham');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `products` text DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `membership` varchar(100) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aldi`
--
ALTER TABLE `aldi`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `lidl`
--
ALTER TABLE `lidl`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `membershiptypes`
--
ALTER TABLE `membershiptypes`
  ADD PRIMARY KEY (`MembershipTypeID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `tesco`
--
ALTER TABLE `tesco`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `userregistration`
--
ALTER TABLE `userregistration`
  ADD PRIMARY KEY (`user_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `aldi`
--
ALTER TABLE `aldi`
  ADD CONSTRAINT `aldi_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `lidl`
--
ALTER TABLE `lidl`
  ADD CONSTRAINT `lidl_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `tesco`
--
ALTER TABLE `tesco`
  ADD CONSTRAINT `tesco_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userregistration` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
