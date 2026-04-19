import mongoose from 'mongoose';

const interviewSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        required: true
    },
    questions: {
        type: [String],
        default: []
    },
    answers: {
        type: [String],
        default: []
    },
    feedback: {
        type: Object,
        default: null
    },
    score: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model('InterviewSession', interviewSessionSchema);
