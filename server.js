import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import colors from 'colors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import imageRoutes from './routes/imageRoute.js';

import { errorHandler, notFound } from './middleware/errorMiddleware.js';

connectDB();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', imageRoutes);

app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server started on port ${port}`));
