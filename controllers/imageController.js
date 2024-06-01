import User from '../models/userModel.js';
import Image from '../models/imageModel.js';
import asyncHandler from 'express-async-handler';

// @desc Upload Image to DataBase
// @route POST /api/images/upload
// @privacy Private
const uploadImage = asyncHandler(async (req, res) => {
  const apiKey = req.headers['api-key'];
  const { file } = req.body;
  // checkes if user exist
  const user = await User.findOne({ apiKey });
  if (!user) {
    res.status(401);
    throw new Error('Invalid API key');
  }

  if (!file) {
    res.status(400);
    throw new Error('No file provided');
  }

  try {
    const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
    const image = new Image({ owner: user._id, base64: base64Data });
    await image.save();
    res.status(201).json({ message: 'Image uploaded successfully', image });
  } catch (error) {
    res.status(500);
    throw new Error('Error uploading image', error);
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
