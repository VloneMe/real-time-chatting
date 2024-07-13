import { timeStamp } from "console";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    fname: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: false,
    }
}, { timestamps: true});

export default model("User", userSchema);