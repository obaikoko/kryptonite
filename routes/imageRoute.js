import express from 'express';
import {
  getAllImages,
  getImageById,
  uploadImage,
} from '../controllers/imageController.js';
const router = express.Router();

router.get('/images', getAllImages);
router.post('/images/upload', uploadImage);
router.get('/images/:id', getImageById);

export default router;
