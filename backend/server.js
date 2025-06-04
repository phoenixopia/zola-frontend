import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import consultationRoutes from './routes/consultationRoutes.js';
import ProgramRoutes from './routes/ProgramRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/consultations', consultationRoutes);
app.use('/api/programs', ProgramRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));