import mongoose from "mongoose";

const userSchma = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true })


const User = mongoose.models.users || mongoose.model("users", userSchma)
export  default User;