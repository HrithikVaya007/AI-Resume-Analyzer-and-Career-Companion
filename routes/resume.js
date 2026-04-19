import express from 'express';
import { uploadResume, getResumeHistory, deleteResume } from '../controllers/resume.controller.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../config/multer.js';

const router = express.Router();

router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/history', protect, getResumeHistory);
router.delete('/:id', protect, deleteResume);

export default router;
