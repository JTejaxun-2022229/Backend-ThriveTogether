import { request, response } from 'express';
import Post from './Post.model.js';
import User from '../user/user.model.js';

export const createPost = async (req = request, res = response) => {
    const { title, description } = req.body;
    const { user } = req;

    try {
        const post = new Post({ title, description, user: user.id });
        await post.save();

        const userData = await User.findById(user.id).select('name');
        res.status(201).json({ post, userName: userData.name });
    } catch (e) {
        res.status(500).json({ msg: 'Contact the administrator' });
    }
};


export const updatePost = async (req = request, res = response) => {
    const { id } = req.params;
    const { title, description } = req.body;
    
    try {
        const post = await Post.findByIdAndUpdate(id, { title, description }, { new: true });
        res.status(200).json({ post });
    } catch (e) {
        res.status(500).json({ msg: 'Contact the administrator' });
    }
};

export const deletePost = async (req = request, res = response) => {
    const { id } = req.params;
    
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        post.status = false;
        await post.save();
        res.status(200).json({ msg: 'Post deleted' });
    } catch (e) {
        res.status(500).json({ msg: 'Contact the administrator' });
    }
};