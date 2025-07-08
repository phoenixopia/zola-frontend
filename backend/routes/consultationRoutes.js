import express from 'express';
import { createConsultation ,getConsultations , deleteConsultation } from '../controllers/consultationController.js';

const router = express.Router();


router.get('/', getConsultations);
router.post('/', createConsultation);
router.delete('/:id', deleteConsultation);

export default router;