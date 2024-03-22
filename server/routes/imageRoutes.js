
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
router.get('/uploadi', (req, res) => {
    const rseq = req.body;
    cloudinary.v2.uploader.upload("a.jpeg")
      .then(result => {
        console.log(result);
        res.status(200).json({ success: true, result });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
      });
  });

router.put('/upload',  (req, res) => {
  try {
    
    // const image=req.body.image;
    // const store = req.body.store;
    // const productId = req.body.productId;
    const {image,store,productId} = req.body;
    console.log(req.body);

    if (!image) {
        return res.status(400).json({ error: 'No image data provided' });
      }
    const result =  cloudinary.v2.uploader.upload(image).then(result => console.log(result))
    .catch(error => console.error(error));;

    // Store the Cloudinary URL in your database
    const imageUrl = result.secure_url;
    

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
// import cloudinary from 'cloudinary';
// import express from 'express';
// import multer from 'multer';
// import { Readable } from 'stream';
// import db from '../config/db.js';

// const router = express.Router();

// // Configure multer for handling file uploads
// const upload = multer();

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: 'dhtw6erpk',
//   api_key: '116233414617767',
//   api_secret: 'QGxpcw5tvz3s3ZdoBlWA89qgtus'
// });

// router.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     console.log('Request Headers:', req.headers); // Log request headers
//     console.log('Request File:', req.file); // Log request file

//     if (!req.file) {
//       return res.status(400).json({ error: 'No image file provided' });
//     }

//     // Create a readable stream from the Buffer
//     const fileStream = Readable.from(req.file.buffer);

//     const uploadPromise = new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.v2.uploader.upload_stream(
//         {
//           upload_preset: 'your_upload_preset', // Replace with your Cloudinary upload preset
//         },
//         (error, result) => {
//           if (error) {
//             console.error('Error uploading image to Cloudinary:', error);
//             reject(error);
//           } else {
//             console.log('Cloudinary Upload Result:', result); // Log Cloudinary upload result
//             resolve(result);
//           }
//         }
//       );

//       fileStream.pipe(uploadStream);
//     });

//     const result = await uploadPromise;

//     // Store the Cloudinary URL in your database
//     const imageUrl = result.secure_url;
//     const store = req.body.store;
//     const productId = req.body.productId;


//     let columnName;
//     switch (store) {
//       case 'Tesco':
//         columnName = 'image_url_tesco';
//         break;
//       case 'Aldi':
//         columnName = 'image_url_aldi';
//         break;
//       case 'Lidl':
//         columnName = 'image_url_lidl';
//         break;
//       default:
//         return res.status(400).json({ error: 'Invalid store name' });
//     }

//     const updateQuery = `UPDATE product SET ${columnName} = ? WHERE product_id = ?`;
//     db.query(updateQuery, [imageUrl, productId], (err, result) => {
//       if (err) {
//         console.error('Error updating product image URL: ', err);
//         return res.status(500).json({ error: 'Error updating product image URL' });
//       }
//       return res.status(200).json({ message: 'Image URL updated successfully' });
//     });
//   } catch (error) {
//     console.error('Error uploading image to Cloudinary: ', error);
//     return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
//   }
// });

// export default router;