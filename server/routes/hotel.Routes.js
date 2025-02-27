import express from 'express';
import placeUpload from '../utils/palce.Storage.js';
import { addHotels, getNearestHotels } from '../controllers/hotel.Controller.js';
const router = express.Router();

router.post("/add-hotels",placeUpload.single('file'), addHotels)
router.post("/get-hotels", getNearestHotels)

export default router;






