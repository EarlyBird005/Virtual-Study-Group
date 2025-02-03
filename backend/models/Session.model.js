import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String
    },
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    visibility: {
        type: String,
        default: "public"
    },
    privateUrl: {
        type: String
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            joinedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    status: {
        type: String,
        enum: ["ongoing", "ended", "scheduled for the future"]
    }
}, { timestamps: true }); 

export const SessionModel = mongoose.model("Session", SessionSchema);