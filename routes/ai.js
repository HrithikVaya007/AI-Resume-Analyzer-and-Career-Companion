import express from 'express';
import { getAiQuestions } from '../controllers/ai.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/questions', protect, getAiQuestions);

export default router;
