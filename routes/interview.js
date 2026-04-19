import express from 'express';
import { startSession, nextQuestion, submitSession, getInterviewHistory, getSessionById } from '../controllers/interview.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/start', protect, startSession);
router.post('/next', protect, nextQuestion);
router.post('/submit', protect, submitSession);
router.get('/history', protect, getInterviewHistory);
router.get('/:id', protect, getSessionById);

export default router;
