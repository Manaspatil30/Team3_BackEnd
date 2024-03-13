import cloudinary from 'cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dhtw6erpk',
    api_key: '116233414617767',
    api_secret: 'QGxpcw5tvz3s3ZdoBlWA89qgtus'
});

// Set up multer for file uploads
const upload = multer({ dest: 'Home/product_images' }); // Destination folder for temporary storage

export default  upload ;
