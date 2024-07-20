import { response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';

export const registerUser = async (req, res) => {

    const { name, username, email, password, description, photo, role, status, progress, vices } = req.body;

    const user = new User({ name, username, email, password, description, photo, role, status, progress, vices });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user
    });
};

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                msg: 'Incorrect credentials'
            });
        }

        if (!user.status) {

            return res.status(400).json({
                msg: 'This account is not registered'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {

            return res.status(400).json({
                msg: 'Incorrect password'
            });
        }

        const token = await generarJWT(user.id, user.name, user.username, user.role);

        res.status(200).json({
            
            msg: 'Access granted',
            user: {
                name: user.name,
                username: user.username
            },
            token
        });

    } catch (e) {

        res.status(500).json({
            msg: 'Contact the administrator'
        });
    }
};