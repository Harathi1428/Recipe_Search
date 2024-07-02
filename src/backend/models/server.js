const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const user=require('./user');

const app=express();
const port=3001

app.use(express.json());
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/Users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Users database connected");
}).catch((err) => {
    console.error("Users database connection error:", err);
});

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new user({
        username,
        email,
        password, 
    });
    try {
        // const savedUser = await newUser.save();
        res.status(201).json({ userId: newUser._id });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ message: 'Error creating user' });
    }
});

app.post("/login", async (req, res) => {
    const { email} = req.body;
    try {
        const person = await user.findOne({ email });
        if (!person) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        console.log(person._id)
        res.status(200).json({ userId: person._id });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: 'Error logging in' });
    }
});
app.listen(port,()=>{
    console.log(`port listening on port ${port}`)
 })