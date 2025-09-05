const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/jerseyDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model("User", userSchema);

// ✅ API Route to Save Login Info
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Save user data in DB
    const newUser = new User({ username, password });
    await newUser.save();

    res.json({ message: "Login info saved successfully!" });
});

// Start server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
