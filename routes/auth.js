import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

router.post("/register",async (req, res) => {
    const {name , email, password} = req.body || {};
    console.log("Request Body:",req.body);
    try{
        if (!name || !email || !password){
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({ message: 'User already exists' });
        }

        const role = req.body.email === "admin@resumeanalyzer.com" ? "admin" : "user";

        const user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            role
        });

        const token = generateToken(user._id);
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        });


    }catch(error){
        console.error("Register Error :",error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'User already exists' });
        }
        res.status(500).json({ message: 'Server error' });

    }
});

router.post("/login",async (req,res)=>{
    const {email, password} = req.body || {};
    try{
        if(!email || !password){
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'User not found' });

        }
        if (!user.isActive) {
            return res.status(403).json({ message: 'Account deactivated. Contact support.' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user._id);
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        });
    }catch(error){
        console.error("Login Error :",error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;