import mongoose from "mongoose";

/**El psicólogo va a poder modificar los días que no se encuentre o designar su propio horario*/
const availabilitySchema = new mongoose.Schema({

    idPhycologist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    startTime: {
        type: Date,
        required: true,
    },

    endTime: {
        type: Date,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

availabilitySchema.methods.toJSON = function() {
    const { __v, _id, ...availability } = this.toObject();
    availability.availability_id = _id;
    return availability;
};

export default mongoose.model('Availability', availabilitySchema);