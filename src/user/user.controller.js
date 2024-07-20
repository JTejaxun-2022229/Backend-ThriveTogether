import { request, response } from 'express';
import User from './user.model.js';

export const getUsers = async (req = request, res = response) => {

    try {

        const users = await User.find({}, 'name username role');
        res.status(200).json({ users });
    } catch (e) {

        res.status(500).json({ msg: 'Contact the administrator' });
    }
};

export const getUserById = async (req = request, res = response) => {

    const { user } = req;

    try {

        const userData = await User.findById(user.id).select('-password');
        res.status(200).json({ user: userData });
    } catch (e) {

        res.status(500).json({ msg: 'Contact the administrator' });
    }
};


export const updateUser = async (req = request, res = response) => {

    const { user } = req;
    const updateData = req.body;
    
    try {

        const updatedUser = await User.findByIdAndUpdate(user.id, updateData, { new: true }).select('-password');
        res.status(200).json({ user: updatedUser });
    } catch (e) {

        res.status(500).json({ msg: 'Contact the administrator' });
    }
};

export const deleteUser = async (req = request, res = response) => {

    const { user } = req;
    
    try {

        const userData = await User.findById(user.id);

        if (!userData || !userData.status) {
            return res.status(400).json({ msg: 'User already deleted' });
        }

        userData.status = false;
        await userData.save();
        res.status(200).json({ msg: 'User account deactivated' });
    } catch (e) {
        
        res.status(500).json({ msg: 'Contact the administrator' });
    }
};