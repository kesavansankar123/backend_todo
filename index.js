// Backend - server.js
const express = require("express");
const Mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(express.json());
app.use(cors());

const url = 'mongodb+srv://gokul:sankar@mern.sqrvp1s.mongodb.net/?retryWrites=true&w=majority&appName=mern'

app.use(bodyParser.json());
app.use(express.json());

 function loginDetails() {
    Mongoose.connect(url) 
    // Mongoose.connection.once('open',() => {
    //     console.log('connected success');
        const db = Mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
        console.log('Connected to MongoDB');
});       
}

loginDetails()

const todoSchema = new Mongoose.Schema({
  text: String,
  completed: Boolean,
});
const Todo = Mongoose.model("Todo", todoSchema);

// Routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo({ text: req.body.text, completed: false });
  await newTodo.save();
  res.json(newTodo);
});

app.put("/todos/:id", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTodo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
