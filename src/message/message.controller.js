import { response, request } from "express";
import Message from "./message.model.js";

export const postMessage = async (req, res) => {
    const { receptor, emisor, content } = req.body;
    const message = new Message({ receptor, emisor, content });

    try {
        await message.save();

        res.status(201).json({
            message
        });

    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

export const getMessages = async (req = request, res = response) => {
    const { start, end } = req.query;
    const query = { status: true };

    try {
        const [total, messages] = await Promise.all([
            Message.countDocuments(query),
            Message.find(query)
                .skip(Number(start))
                .limit(Number(end))
                .populate('receptor emisor')
        ]);

        res.status(200).json({
            total,
            messages
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

export const getMessageById = async (req, res) => {
    const { id } = req.params;

    try {
        const message = await Message.findOne({ _id: id })
            .populate('receptor emisor');

        res.status(200).json({
            message
        });
    } catch (error) {
        console.error('Error fetching message by ID:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

export const putMessage = async (req, res = response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    try {
        const updatedMessage = await Message.findByIdAndUpdate(id, resto, { new: true })
            .populate('receptor emisor');

        res.status(200).json({
            msg: 'Updated Message!!',
            message: updatedMessage
        });
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

export const deleteMessage = async (req, res) => {
    const { id } = req.params;

    try {
        const message = await Message.findByIdAndUpdate(id, { status: false });

        res.status(200).json({
            msg: 'Message successfully removed',
            message,
        });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

