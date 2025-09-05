import mongoose, { Schema } from "mongoose";

const subtaskSchema = new Schema({
    title: {
        type: String,
        requrired: true,
        trim: true,
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requried: true,
    },
},{
    timestamps: true,
});

export const SubTask = mongoose.model("SubTask", subtaskSchema);