import multer from 'multer';
import path from 'path';

// Set up storage configuration for hotel images
const hotelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/hotels'); // Hotel images go into 'hotels' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// Initialize multer with hotel storage configuration
const hotelUpload = multer({ storage: hotelStorage });

export default hotelUpload;
