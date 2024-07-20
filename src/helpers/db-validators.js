import Forum from '../forum/forum.controller.js';

export const existeForo = async (foro = '') => {
    
    const existeForo = await Forum.findOne({ foro });
    
    if(existeForo){
        throw new Error(`The forum ${foro} exist`);
    }
    
}

export const existeEmail = async (email = '') => {

    const existeEmail = await User.findOne({ email });

    if (existeEmail) {
        throw new Error(`The email ${email} exist`);
    }
}