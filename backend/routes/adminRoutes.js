import express from 'express';
import { loginAdmin } from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', loginAdmin);

// Protected route
router.get('/dashboard', protectAdmin, (req, res) => {
  res.json({ message: 'Welcome, Admin!', admin: req.admin });
});

export default router;