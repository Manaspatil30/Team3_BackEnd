
import cloudinary from 'cloudinary';
import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dhtw6erpk',    
    api_key: '116233414617767',
    api_secret: 'QGxpcw5tvz3s3ZdoBlWA89qgtus'
});

router.post('/upload', async (req, res) => {
  try {
    if (!req.body.image) {
        return res.status(400).json({ error: 'No image data provided' });
      }
    const result = await cloudinary.v2.uploader.upload(req.body.image).then(result => console.log(result))
    .catch(error => console.error(error));;

    // Store the Cloudinary URL in your database
    const imageUrl = result.secure_url;
    const store = req.body.store;
    const productId = req.body.productId;

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

    const updateQuery = `UPDATE product SET ${columnName} = ? WHERE product_id = ?`;
    db.query(updateQuery, [imageUrl, productId], (err, result) => {
      if (err) {
        console.error('Error updating product image URL: ', err);
        return res.status(500).json({ error: 'Error updating product image URL' });
      }
      return res.status(200).json({ message: 'Image URL updated successfully' });
    });
  } catch (error) {
    console.error('Error uploading image to Cloudinary: ', error);
    return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
  }
});

export default router;
