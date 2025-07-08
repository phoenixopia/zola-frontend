import express from 'express';
import multer from 'multer';
import { createSetting , getSettings , deleteSetting } from '../controllers/settingController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/', upload.single('image'), createSetting);
router.get('/', getSettings);
router.delete('/:id', deleteSetting);

export default router;
