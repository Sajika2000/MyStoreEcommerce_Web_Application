require('dotenv').config(); 
const express = require('express');
const app = express();

const cors = require("cors");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log("Server is running at port:" + PORT));

//schema 

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique:true,
    },
    password: String,
    confirmPassword: String,
    image: String
})
//
const userModel = mongoose.model("user",userSchema)

//api

app.get("/",(req,res) => {
    res.send("server is running")
});
app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        console.log(existingUser);

        if (existingUser) {
            res.send({ message: "Email id is already registered" });
        } else {
            const data = new userModel(req.body);
            await data.save(); // Wait for the save operation to complete
            res.send({ message: "Successfully signed up" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred during the sign up process" });
    }
});

