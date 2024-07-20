import { Schema, model } from "mongoose";

const UserSchema = Schema({

    name: {
        type: String,
        require: [true, 'Name is neccessary']
    },
    username: {
        type: String,
        require: [true, 'Username is neccesary'],
        unique: true
    },
    email: {
        type: String,
        require: [true, 'Email is neccesary'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Password is neccessary']
    },
    description:{
        type: String,
        default: "None"
    },
    photo:{
        type: String,
        default: "None"
    },
    role: {
        type: String,
        enum: ["USER_ROLE", "SUPPORTER_ROLE", "ADMIN_ROLE"],
        default: "USER_ROLE"
    },
    status: {
        type: Boolean,
        default: true
    }
});

export default model('User', UserSchema);