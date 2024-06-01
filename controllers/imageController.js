import User from '../models/userModel.js';
import Image from '../models/imageModel.js';
import asyncHandler from 'express-async-handler';

// @desc Upload Image to DataBase
// @route POST /api/images/upload
// @privacy Private
const uploadImage = asyncHandler(async (req, res) => {
  try {
    const apiKey = req.headers['api-key'];
    const { file } = req.body;

    // Check if user exists
    const user = await User.findOne({ apiKey });
    if (!user) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    // Check if file is provided
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Extract base64 data and check the MIME type
    const matches = file.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches) {
      return res
        .status(400)
        .json({ error: 'Invalid file format. Please upload an image.' });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/gif',
      'image/bmp',
      'image/webp',
    ];
    if (!allowedMimeTypes.includes(mimeType)) {
      return res.status(400).json({
        error:
          'Unsupported image format. Allowed formats: JPEG, PNG, GIF, BMP, WEBP.',
      });
    }

    // Save the image to the database
    const image = new Image({ owner: user._id, base64: base64Data, mimeType });
    await image.save();

    return res
      .status(201)
      .json({ message: 'Image uploaded successfully', image });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Error uploading image', details: error.message });
  }
});

// @desc Get Images from DataBase
// @route GET /api/images
// @privacy Public
const getAllImages = asyncHandler(async (req, res) => {
  const images = await Image.find();
  res.status(200);
  res.json(images);
});

// @desc Get Image by ID from DataBase
// @route GET /api/images/:id
// @privacy Public
const getImageById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  if (!image) {
    res.status(404);
    throw new Error('Image not found');
  }
  res.status(200);
  res.json(image);
});

export { getAllImages, getImageById, uploadImage };
