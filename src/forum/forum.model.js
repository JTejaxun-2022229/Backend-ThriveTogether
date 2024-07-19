import mongoose from 'mongoose';

const ForumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    comentarios: [{
        user: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        fecha: {
            type: Date,
            default: Date.now,
        }
    }]
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Forum', ForumSchema);
