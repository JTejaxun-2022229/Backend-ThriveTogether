import Forum from '../forum/forum.model.js';

export const existeForo = async (foro = '') => {
    
    const existeForo = await Forum.findOne({ foro });
    
    if(existeForo){
        throw new Error(`The forum ${foro} exist`);
    }
    
}
