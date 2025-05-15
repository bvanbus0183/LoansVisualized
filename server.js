const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve static files from 'public' directory

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/loans_visualized", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  loans: [
    {
      name: String,
      balance: Number,
      interestRate: Number,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model("User", userSchema);

// Routes
app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ userId: user._id });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/loans/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user.loans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/loans/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.loans.push(req.body);
    await user.save();
    res.status(201).json(user.loans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/loans/:userId/:loanId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.loans = user.loans.filter(
      (loan) => loan._id.toString() !== req.params.loanId
    );
    await user.save();
    res.json(user.loans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
