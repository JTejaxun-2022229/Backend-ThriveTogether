import User from '../user/user.model.js';
import Forum from '../forum/forum.model.js';

export const existUsername = async (username = '') => {

    const user = await User.findOne({ username });

    if (user) {

        throw new Error(`The username ${username} is already taken`);
    }
}

export const existeEmail = async (email = '') => {

    const user = await User.findOne({ email });
    
    if (user) {

        throw new Error(`The email ${email} is already taken`);
    }
}

export const isStatusValid = (status = true) => {

    if (status === false) {

        throw new Error('Status cannot be false');
    }
}

export const existForum = async (title) => {

    const forum = await Forum.findOne({ title });
    
    if (forum) {
        throw new Error(`The forum with the title '${title}' already exists`);
    }
};

