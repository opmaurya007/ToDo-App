import mongoose, { Schema, Model } from 'mongoose';

const toDoSchema: Schema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const ToDo = mongoose.model("ToDo", toDoSchema)

export default ToDo;

