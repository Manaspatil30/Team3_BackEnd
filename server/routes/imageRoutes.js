// imageRoutes.js
const express = require('express');
const cloudinary = require('cloudinary').v2; // Cloudinary SDK
const mysql = require('mysql');

const router = express.Router();
const db=require( '../config/db')
// Cloudinary configuration

cloudinary.config({
  cloud_name: 'dhtw6erpk',
  api_key: '116233414617767',
  api_secret: 'QGxpcw5tvz3s3ZdoBlWA89qgtus',
  secure: true,
});



// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('Connected to database');
// });

// Route to upload image for a product to Cloudinary
router.post('/upload-image/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const file = req.body.file; // Assuming the image file is sent in the request body

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file, { folder: 'product_images' });

    // Store the Cloudinary image URL in the database
    const imageUrl = result.secure_url;
    const sql = 'UPDATE product SET image_url = ? WHERE product_id = ?';
    db.query(sql, [imageUrl, productId], (err, result) => {
      if (err) throw err;
      console.log('Image uploaded and URL stored in database');
      res.send('Image uploaded and URL stored in database');
    });
  } catch (error) {
    console.error('Error uploading image:', error.message);
    res.status(500).send('Error uploading image');
  }
});

// Route to retrieve image URL for a product
router.get('/get-image/:productId', (req, res) => {
  const productId = req.params.productId;
  const sql = 'SELECT image_url FROM product WHERE product_id = ?';
  db.query(sql, [productId], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const imageUrl = result[0].image_url;
      res.send(imageUrl);
    } else {
      res.status(404).send('Image URL not found');
    }
  });
});

module.exports = router;
