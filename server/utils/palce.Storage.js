import multer from 'multer';
import path from 'path';

// Set up storage configuration for place images
const placeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/places'); // Place images go into 'places' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// Initialize multer with place storage configuration
const placeUpload = multer({ storage: placeStorage });

export default placeUpload;
