// imageRoutes.js
const express = require('express');
const cloudinary = require('cloudinary').v2; // Cloudinary SDK
const mysql = require('mysql');
//require("dotenv").config()

const router = express.Router();
const db = require('../config/db');

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

// Define route for uploading an image
router.post('/upload', async (req, res) => {
    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.body.image, { folder: 'your-folder-name' });
        // Process result and store necessary information in your database
        const imageUrl = result.secure_url;
        const storeId = req.body.storeId; // Assuming you're sending the store ID along with the image
        let imageUrlColumn;
        switch (storeId) {
            case 1:
                imageUrlColumn = 'image_url_tesco';
                break;
            case 2:
                imageUrlColumn = 'image_url_aldi';
                break;
            case 3:
                imageUrlColumn = 'image_url_lidl';
                break;
            default:
                return res.status(400).json({ error: 'Invalid store ID' });
        }
        const updateQuery = `UPDATE product SET ${imageUrlColumn} = ? WHERE product_id = ?`;
        db.query(updateQuery, [imageUrl, req.body.productId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'Image uploaded successfully', imageUrl: imageUrl });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Other routes for retrieving, updating, and deleting images can remain the same

module.exports = router;
