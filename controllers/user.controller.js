import User from '../models/User.js';

export const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const updateUserSettings = async (req, res, next) => {
    try {
        const { preferences, name, email } = req.body;
        
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (preferences) user.preferences = { ...user.preferences, ...preferences };

        await user.save();
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};
