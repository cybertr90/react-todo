import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        user_id: {
            type: String,
            required: true
        }

    },
    {
        timestamps: true
    }
)

export const Todo = mongoose.model('todo_lists', todoSchema)
