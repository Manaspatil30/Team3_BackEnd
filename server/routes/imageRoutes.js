// // imageRoutes.js
// const express = require('express');
// const cloudinary = require('cloudinary').v2; // Cloudinary SDK
// const mysql = require('mysql');
// //require("dotenv").config()

// const router = express.Router();
// const db = require('../config/db');

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: 'dhtw6erpk',
//   api_key: '116233414617767',
//   api_secret: 'QGxpcw5tvz3s3ZdoBlWA89qgtus',
//   secure: true,
// });

// // Route to upload image for a product to Cloudinary
// router.post('/upload-image/:productId', async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     const file = req.body.file; // Assuming the image file is sent in the request body

//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(file, { folder: 'product_images' });

//     // Store the Cloudinary image URL in the database
//     const imageUrl = result.secure_url;

//     let updateQuery;
//     if (req.headers.store === 'Tesco') {
//       updateQuery = 'UPDATE product SET image_url_tesco = ? WHERE product_id = ?';
//     } else if (req.headers.store === 'Aldi') {
//       updateQuery = 'UPDATE product SET image_url_aldi = ? WHERE product_id = ?';
//     } else if (req.headers.store === 'Lidl') {
//       updateQuery = 'UPDATE product SET image_url_lidl = ? WHERE product_id = ?';
//     } else {
//       throw new Error('Invalid store');
//     }

//     db.query(updateQuery, [imageUrl, productId], (err, result) => {
//       if (err) throw err;
//       console.log('Image uploaded and URL stored in database');
//       res.send('Image uploaded and URL stored in database');
//     });
//   } catch (error) {
//     console.error('Error uploading image:', error.message);
//     res.status(500).send('Error uploading image');
//   }
// });

// // Route to retrieve image URL for a product
// router.get('/get-image/:productId', (req, res) => {
//   const productId = req.params.productId;
//   const store = req.headers.store;

//   let imageUrlColumn;
//   if (store === 'Tesco') {
//     imageUrlColumn = 'image_url_tesco';
//   } else if (store === 'Aldi') {
//     imageUrlColumn = 'image_url_aldi';
//   } else if (store === 'Lidl') {
//     imageUrlColumn = 'image_url_lidl';
//   } else {
//     return res.status(400).send('Invalid store');
//   }

//   const sql = `SELECT ${imageUrlColumn} FROM product WHERE product_id = ?`;
//   db.query(sql, [productId], (err, result) => {
//     if (err) throw err;
//     if (result.length > 0) {
//       const imageUrl = result[0][imageUrlColumn];
//       if (imageUrl) {
//         res.send(imageUrl);
//       } else {
//         res.status(404).send('Image URL not found');
//       }
//     } else {
//       res.status(404).send('Product not found');
//     }
//   });
// });
//module.exports = router;


const express = require('express');
const cloudinary = require('cloudinary').v2; // Cloudinary SDK
const mysql = require('mysql');
const router = express.Router();
const db = require('../config/db');

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dhtw6erpk',
  api_key: '116233414617767',
  api_secret: 'QGxpcw5tvz3s3ZdoBlWA89qgtus',
  secure: true,
});

// Route to upload image for a product to Cloudinary
router.post('/upload_image/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const file = req.body.file;

    if (!file || !productId) {
      return res.status(400).send('File and productId are required');
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file);

    // Store the Cloudinary image URL in the database
    const imageUrl = result.secure_url;

    let updateQuery;
    switch (req.headers.store) {
      case 'Tesco':
        updateQuery = 'UPDATE product SET image_url_tesco = ? WHERE product_id = ?';
        break;
      case 'Aldi':
        updateQuery = 'UPDATE product SET image_url_aldi = ? WHERE product_id = ?';
        break;
      case 'Lidl':
        updateQuery = 'UPDATE product SET image_url_lidl = ? WHERE product_id = ?';
        break;
      default:
        throw new Error('Invalid store');
    }

    db.query(updateQuery, [imageUrl, productId], (err, result) => {
      if (err) {
        console.error('Error storing image URL in database:', err);
        return res.status(500).send('Error storing image URL in database');
      }
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
  const store = req.headers.store;

  if (!productId || !store) {
    return res.status(400).send('Product ID and store are required');
  }

  let imageUrlColumn;
  switch (store) {
    case 'Tesco':
      imageUrlColumn = 'image_url_tesco';
      break;
    case 'Aldi':
      imageUrlColumn = 'image_url_aldi';
      break;
    case 'Lidl':
      imageUrlColumn = 'image_url_lidl';
      break;
    default:
      return res.status(400).send('Invalid store');
  }

  const sql = `SELECT ${imageUrlColumn} FROM product WHERE product_id = ?`;
  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.error('Error retrieving image URL from database:', err);
      return res.status(500).send('Error retrieving image URL from database');
    }
    if (result.length > 0) {
      const imageUrl = result[0][imageUrlColumn];
      if (imageUrl) {
        res.send(imageUrl);
      } else {
        res.status(404).send('Image URL not found');
      }
    } else {
      res.status(404).send('Product not found');
    }
  });
});

module.exports = router;
