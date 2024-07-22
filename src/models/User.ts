import mongoose, { Schema, model } from "mongoose";

export interface IUser extends Document {
    fname: string;
    username: string;
    email: string;
    password: string;
};

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 150
    },
    fname: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 150,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 150,
    }
}, { timestamps: true});

const User = 
    mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;