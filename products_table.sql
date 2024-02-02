-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2024 at 02:35 PM
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
-- Database: `unikart_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `products_table`
--
-- Create UserRegistration table
CREATE TABLE UserRegistration (
    user_id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    membership VARCHAR(100),
    MembershipTypeID INT, -- Added for linking to MembershipTypes
    start_date DATE,
    end_date DATE
);

-- Create MembershipTypes table
CREATE TABLE MembershipTypes (
    MembershipTypeID INT PRIMARY KEY,
    TypeName VARCHAR(255),
    Description TEXT,
    Price DECIMAL(10, 2)
);

-- Add foreign key to UserRegistration for MembershipTypeID after MembershipTypes table is created
ALTER TABLE UserRegistration
ADD CONSTRAINT fk_user_membership
FOREIGN KEY (MembershipTypeID) REFERENCES MembershipTypes(MembershipTypeID);

-- Create Product table
CREATE TABLE Product (
    product_id INT,
    product_name VARCHAR(255),
    description TEXT,
    category VARCHAR(100),
    brand VARCHAR(100),
    quantity INT,
    best_before DATE,
    store_id INT -- Assumes linking to a Store table not provided in your script
    -- If a Store table exists, a foreign key constraint would be added similarly to other tables
);

-- Create TRANSACTION table
CREATE TABLE TRANSACTION (
    transaction_id INT,
    user_id INT,
    products TEXT,
    total_price DECIMAL(10, 2),
    location VARCHAR(255),
    date DATE,
    time TIME,
    CONSTRAINT fk_transaction_user FOREIGN KEY (user_id) REFERENCES UserRegistration(user_id)
);

-- Assuming a Store table exists and needs linking to the Product table
-- The following is an example and should be adjusted based on your actual Store table schema
-- CREATE TABLE Store (
--     store_id INT PRIMARY KEY,
--     store_name VARCHAR(255),
--     location TEXT
-- );

-- ALTER TABLE Product
-- ADD CONSTRAINT fk_product_store
-- FOREIGN KEY (store_id) REFERENCES Store(store_id);
