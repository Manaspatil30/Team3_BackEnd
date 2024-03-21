
import cloudinary from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

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
        folder: 'unikart', // Specify the folder name in Cloudinary where images will be uploaded
        format: async (req, file) => 'png', // Specify the format of the uploaded images
        public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Generate a unique public ID for each image
    },
});

// Initialize Multer with the configured storage
const upload = multer({ storage: storage });
// Perform the upload
cloudinary.v2.uploader.upload("a.jpeg")
  .then(result => console.log(result))
  .catch(error => console.error(error));
export default upload;