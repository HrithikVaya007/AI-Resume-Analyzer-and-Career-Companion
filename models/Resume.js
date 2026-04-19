import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    parsedText: {
        type: String,
        required: true
    },
    detectedRole: {
        type: String,
        default: 'Unknown'
    },
    skills: {
        type: [String],
        default: []
    },
    atsScore: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model('Resume', resumeSchema);
