require("dotenv").config();
require("global-agent/bootstrap");

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: "10mb" }));
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log("Server is running at port:" + PORT));

//schema

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  image: String,
});
//
const userModel = mongoose.model("user", userSchema);

//api

app.get("/", (req, res) => {
  res.send("server is running");
});
app.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password, image } = req.body;
  
    if (!email || !password || !firstName) {
      return res.status(400).send({ message: "Required fields are missing" });
    }
  
    try {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(409).send({ message: "Email already registered" });
      }
  
      const newUser = new userModel({ firstName, lastName, email, password, image });
      await newUser.save();
      res.status(201).send({ message: "User creation successful" });
    } catch (error) {
      res.status(500).send({ message: "Internal server error", error });
    }
  });
