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
    comentaries: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
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
    status:{
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Forum', ForumSchema);
