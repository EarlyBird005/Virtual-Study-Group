import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            // required: true
        },
        lastname: {
            type: String
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String // image url
    },
    sessionCreated: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session"
        }
    ],
    sessionAttended: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session"
        }
    ],
    accountCreatedAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true });

export const UserModel = mongoose.model("User", UserSchema);