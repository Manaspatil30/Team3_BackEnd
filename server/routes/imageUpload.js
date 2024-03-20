import cloudinary from 'cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dhtw6erpk',
    api_key: '116233414617767',
    api_secret: 'QGxpcw5tvz3s3ZdoBlWA89qgtus'
});
// Configure Multer storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: './', // Specify the folder name in Cloudinary where images will be uploaded
      format: async (req, file) => 'png', // Specify the format of the uploaded images
      public_id: (req, file) => file.originalname, // Use the original file name as the public ID
    },
  });
  
  // Initialize Multer with the configured storage
  const upload = multer({ storage: storage });
  

export default  upload ;
