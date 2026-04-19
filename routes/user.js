import express from 'express';
import { getUserProfile, updateUserSettings } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/settings', protect, updateUserSettings);

export default router;
