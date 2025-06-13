import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import consultationRoutes from './routes/consultationRoutes.js';
import ProgramRoutes from './routes/ProgramRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import modelRoutes from "./routes/modelRoutes.js";
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static images

app.use('/api/consultations', consultationRoutes);
app.use('/api/programs', ProgramRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use("/api/models", modelRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
