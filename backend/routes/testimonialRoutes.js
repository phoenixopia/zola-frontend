import express from 'express';
import {
  createTestimonial,
  getAllTestimonials,
  getApprovedTestimonials,
  approveTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';

const router = express.Router();

router.post('/', createTestimonial);
router.get('/all', getAllTestimonials); 
router.get('/', getApprovedTestimonials);
router.put('/:id/approve', approveTestimonial); // admin only
router.delete('/:id', deleteTestimonial); 

export default router;
