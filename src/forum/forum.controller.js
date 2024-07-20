import { respons, request } from "express";
import Forum from './forum.model.js';

export const createForum = async (req, res) => {
    console.log('createForum');

    const { title, type } = req.body;
    const forum = new Forum({title, type});

    await forum.save();

    res.status(200).json({
        forum
    })
}

export const postMessage = async (req, res ) =>{
    const {title, user, text} = req.body;

    const forum = await Forum.findOne({title});


    if (!forum) {
        console.log('hola solo para comprobar');
        return res.status(400).json({
            msg: "This forum does not exist in the database"
        });
    }
    forum.user=user;
    forum.text=text

    const f = await Forum.findByIdAndUpdate(forum.id, forum);

    res.status(200).json({
        msg: "the forum has received new comments",
        f
    });
}

export const getForums = async (req, res) => {
    try {
        const forum = await Forum.find();
        res.status(200).json(forum);
    } catch (error) {
        res.status(500).json({ message: 'Error listing forums', error });
    }
};

export const deleteForum = async (req, res) => {
    try {
        const { id } = req.params;
        const forum = await Forum.findOne({ _id: id });

        if (!forum) {
            return res.status(404).json({
                msg: 'This forum is not registered'
            });
        }

        const updateFields = { status: false };

        const updatedForum = await Forum.findByIdAndUpdate(forum._id, updateFields, { new: true });

        res.status(200).json({
            msg: 'Forum marked as inactive',
            forum: updatedForum
        });

    } catch (error) {
        console.error('Error updating forum:', error);
        res.status(500).json({
            msg: 'Error updating forum'
        });
    }
}

export const deleteComment = async (req, res) => {
    const { forumId, commentId } = req.params;
    try {
        const forum = await Forum.findById(forumId);
        if (!forum) {
            return res.status(404).json({ msg: 'Forum not found' });
        }

        const commentIndex = forum.comentaries.findIndex(comment => comment._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        forum.comentaries.splice(commentIndex, 1);
        await forum.save();
        
        res.status(200).json({ msg: 'Comment successfully deleted' });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting this comment', error });
    }
};


