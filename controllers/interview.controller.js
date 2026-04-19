import InterviewSession from '../models/InterviewSession.js';
import { getNextQuestion, generateFeedback } from '../services/ai.service.js';

export const startSession = async (req, res, next) => {
    try {
        const { role } = req.body;
        if (!role) {
            return res.status(400).json({ message: 'Role is required' });
        }

        const session = new InterviewSession({
            userId: req.user._id,
            role,
            questions: [],
            answers: []
        });

        const firstQuestion = await getNextQuestion(session);
        session.questions.push(firstQuestion);
        
        await session.save();
        res.status(201).json(session);
    } catch (err) {
        next(err);
    }
};

export const nextQuestion = async (req, res, next) => {
    try {
        const { sessionId, answer } = req.body;
        
        const session = await InterviewSession.findOne({ _id: sessionId, userId: req.user._id });
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        session.answers.push(answer);
        
        // ONLY generate a new question if we haven't reached the limit (5)
        if (session.questions.length < 5) {
            const nextQ = await getNextQuestion(session);
            session.questions.push(nextQ);
        }

        await session.save();
        res.status(200).json(session);
    } catch (err) {
        next(err);
    }
};

export const submitSession = async (req, res, next) => {
    try {
        const { sessionId } = req.body;
        
        const session = await InterviewSession.findOne({ _id: sessionId, userId: req.user._id });
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        const feedbackObj = await generateFeedback(session);
        
        session.feedback = feedbackObj;
        session.score = feedbackObj.score || 0;

        await session.save();
        res.status(200).json(session);
    } catch (err) {
        next(err);
    }
};

export const getInterviewHistory = async (req, res, next) => {
    try {
        const sessions = await InterviewSession.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(sessions);
    } catch (err) {
        next(err);
    }
};

export const getSessionById = async (req, res, next) => {
    try {
        const session = await InterviewSession.findOne({ _id: req.params.id, userId: req.user._id });
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.status(200).json(session);
    } catch (err) {
        next(err);
    }
};
