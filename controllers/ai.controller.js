import { generateQuestions } from '../services/ai.service.js';

export const getAiQuestions = async (req, res, next) => {
    try {
        const { role } = req.body;
        if (!role) {
            return res.status(400).json({ message: 'Role is required' });
        }

        const questions = await generateQuestions(role);
        res.status(200).json({ questions });
    } catch (err) {
        next(err);
    }
};
