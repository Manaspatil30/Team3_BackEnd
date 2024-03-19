    import cloudinary from 'cloudinary';
import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import db from '../config/db.js'; // Assuming you have a db.js file for database connection
    const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dhtw6erpk',
  api_key: '116233414617767',
  api_secret: 'QGxpcw5tvz3s3ZdoBlWA89qgtus',
  secure: true,
});

const express = require('express');
//const router = express.Router();
const cloudinary = require('cloudinary').v2; // Assuming you've installed and configured Cloudinary
const db = require('../config/db'); // Assuming you've configured your database connection

    // Route for uploading a single image
    // 
    router.post('/upload', uploadMiddleware.single('image'), (req, res) => {
        if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
        }
    
        const { store } = req.body; // Assuming you'll send the store name in the request body
        const imageUrl = req.file.path;
        const productId = req.body.productId; // Assuming you'll send the product ID in the request body
    
        // Determine the column name based on the store name
        let columnName;
        switch (store) {
        case 'Tesco':
            columnName = 'image_url_tesco';
            break;
        case 'Aldi':
            columnName = 'image_url_aldi';
            break;
        case 'Lidl':
            columnName = 'image_url_lidl';
            break;
        default:
            return res.status(400).json({ error: 'Invalid store name' });
        }
    
        // Update the product table with the image URL
        const updateQuery = `INSERT product SET ${columnName} = ? WHERE product_id = ?`;
        db.query(updateQuery, [imageUrl, productId], (err, result) => {
        if (err) {
            console.error('Error updating product image URL: ', err);
            return res.status(500).json({ error: 'Error updating product image URL' });
        }
        res.status(200).json({ message: 'Image URL updated successfully' });
        //res.send(result);
        }).then((data)=>{console.log(data)})

    });

    // Route for uploading multiple images
    // router.post('/upload-multiple', uploadMiddleware.array('images', 10), (req, res) => {
    //   if (!req.files || req.files.length === 0) {
    //     return res.status(400).json({ error: 'No images uploaded' });
    //   }

    //   const imageUrls = req.files.map((file) => file.path);
    //   res.status(200).json({ imageUrls });
    // });
    router.post('/upload-multiple', uploadMiddleware.array('images', 10), (req, res) => {
        if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No images uploaded' });
        }
    
        const { store } = req.body; // Assuming you'll send the store name in the request body
        const productId = req.body.productId; // Assuming you'll send the product ID in the request body
    
        // Determine the column name based on the store name
        let columnName;
        switch (store) {
        case 'Tesco':
            columnName = 'image_url_tesco';
            break;
        case 'Aldi':
            columnName = 'image_url_aldi';
            break;
        case 'Lidl':
            columnName = 'image_url_lidl';
            break;
        default:
            return res.status(400).json({ error: 'Invalid store name' });
        }
    
        const imageUrls = req.files.map((file) => file.path);
    
        // Update the product table with the image URLs
        const updateQuery = `UPDATE product SET ${columnName} = ? WHERE product_id = ?`;
        db.query(updateQuery, [imageUrls.join(','), productId], (err, result) => {
        if (err) {
            console.error('Error updating product image URLs: ', err);
            return res.status(500).json({ error: 'Error updating product image URLs' });
        }
        res.status(200).json({ message: 'Image URLs updated successfully' });
        });
    });

    export default router;