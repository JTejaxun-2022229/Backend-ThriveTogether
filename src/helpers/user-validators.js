import User from '../user/user.model.js';

export const existUsername = async (username = '') => {

    const user = await User.findOne({ username });

    if (user) {

        throw new Error(`The username ${username} is already taken`);
    }
}

export const findUsername = async (username = '') => {

    const user = await User.findOne({ username });

    if (!user) {
        
        throw new Error(`The username ${username} does not exist`);
    }
};

export const existeEmail = async (email = '') => {

    const user = await User.findOne({ email });
    
    if (user) {

        throw new Error(`The email ${email} is already taken`);
    }
}

export const existNoteById = async (id = '') => {

    const note = await Note.findById(id);

    if (!note) {

        throw new Error(`The note with id ${id} does not exist`);
    }
};


export const isStatusValid = (status = true) => {

    if (status === false) {

        throw new Error('Status cannot be false');
    }
}

