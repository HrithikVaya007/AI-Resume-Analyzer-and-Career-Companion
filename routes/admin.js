import express from 'express';
import User from '../models/User.js';
import Resume from '../models/Resume.js';
import InterviewSession from '../models/InterviewSession.js';
import { protect, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get platform stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, isAdmin, async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const resumeCount = await Resume.countDocuments();
        const sessionCount = await InterviewSession.countDocuments();

        res.json({
            users: userCount,
            resumes: resumeCount,
            sessions: sessionCount
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', protect, isAdmin, async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Toggle user status
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
router.put('/users/:id/status', protect, isAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.isActive = !user.isActive;
            await user.save();
            res.json({ message: `User account ${user.isActive ? 'activated' : 'deactivated'}` });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
