import { response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js';

export const registerUser = async (req, res) => {

    const { name, username, email, password, description, photo, role, status } = req.body;

    const user = new User({ name, username, email, password, description, photo, role, status });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user
    });
};