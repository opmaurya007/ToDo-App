import express, { Request, Response, Express, Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from "cors";
import ToDo from './db/schema';
const app = express();
app.use(cors<Request>());
app.use(express.json())
const port: number = 2020;

const connect = mongoose
    .connect('mongodb+srv://root:root@cluster0.mw3p3ad.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
        console.log('Connected To DB...');
    })
    .catch((error: any) => {
        console.log(error);
    });



app.get("/todos", async (req, res) => {
    try {
        const todos = await ToDo.find()
        res.status(200).json(todos)
    } catch (error) {
        console.log("error in fetching todos")
    }
})

app.post("/todos", (req, res) => {
    try {
        const { title, description } = req.body
        const newTodos = new ToDo({ title, description })
        newTodos.save()
        res.status(200).json("Todo List Updated")
    } catch (error) {
        console.log("error in posting todos")
    }
})

app.delete("/todos/:id", async (req, res) => {
    const id = req.params.id
    try {
        const deleteTodo = await ToDo.findByIdAndDelete(id)
        res.status(200).json("Todo successfully deleted")
    } catch (error) {
        console.log("error in deleteing todos")
    }
})



app.listen(port, () => {

    console.log(`Server started at port ${port}`);
});
