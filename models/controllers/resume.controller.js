import fs from 'fs';
import { PDFParse } from 'pdf-parse';
import Resume from '../models/Resume.js';
import { analyzeResume } from '../services/ai.service.js';

export const uploadResume = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a PDF file' });
        }

        const dataBuffer = fs.readFileSync(req.file.path);
        const parser = new PDFParse({ data: dataBuffer });
        const data = await parser.getText();
        await parser.destroy();
        const text = data.text;

        const jd = req.body.jd || "";
        const aiResult = await analyzeResume(text, jd);

        const newResume = new Resume({
            userId: req.user._id,
            fileUrl: req.file.path,
            parsedText: text,
            detectedRole: aiResult.role || 'Unknown Role',
            skills: (aiResult.missingSkills || []).map(s => s.name || s),
            atsScore: aiResult.score || 0
        });

        await newResume.save();

        res.status(201).json({
            resume: newResume,
            analysis: aiResult
        });
    } catch (err) {
        next(err);
    }
};

export const getResumeHistory = async (req, res, next) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(resumes);
    } catch (err) {
        next(err);
    }
};

export const deleteResume = async (req, res, next) => {
    try {
        const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        
        if (fs.existsSync(resume.fileUrl)) {
            fs.unlinkSync(resume.fileUrl);
        }

        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (err) {
        next(err);
    }
};
