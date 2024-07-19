import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
    receptor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Enter a valid idUser"]
    },
    emisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Enter a valid idUser"]
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    SendAt: {
        type: Date,
        default: Date.now
    }
});

MessageSchema.methods.toJSON = function () {
    const { __v, _id, ...message } = this.toObject();
    message.messageId = _id;
    return message;
};

export const Message = mongoose.model('Message', MessageSchema);
