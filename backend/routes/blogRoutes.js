import express from 'express';
import { createBlog, getAllBlogs, deleteBlog } from '../controllers/blogController.js';

const router = express.Router();

router.post('/', createBlog);
router.get('/', getAllBlogs);
router.delete('/:id', deleteBlog);

export default router;
