import express from 'express';
import mongoose from 'mongoose';
import model from './data.js';
import cors from 'cors';
import User from './user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  origin: process.env.VITE_FRONT_URL,
  credentials: true, // Allow cross-origin requests with credentials (cookies)
};

// Use the CORS middleware with the specified options
app.use(cors({
  origin: "https://todolist2.vercel.app",  // Allow your frontend domain
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));
// app.use(cors({
//   origin: "http://localhost:5173",  // Allow your frontend domain
//   methods: "GET,POST,PUT,DELETE",
//   credentials: true,
// }));
app.use(cookieParser());

// JWT Middleware
const jwtMiddleware = (req, res, next) => {
  
  const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"



  if (!token) {
    return res.status(401).send("Token missing");
  }

  try {
    // Attempt to verify the token
    const decoded = jwt.verify(token,process.env.VITE_KEY);
    req.user = decoded;
   console.log(req.user)
    next();
  } catch (error) {
    console.log("JWT verification error:", error);
    return res.status(401).send("Invalid or expired token");
  }
};

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    console.log(user)
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ username: username },process.env.VITE_KEY, { expiresIn: "1h" });
   console.log(token)
    res.cookie("tokens", token, { httpOnly: true, secure: false, sameSite: 'none' });
    return res.json({ message: "success", token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Signup route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
   let t= await newUser.save();

    return res.send("success");
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Send data route
app.post("/senddata", jwtMiddleware, async (req, res) => {
  const { time, work } = req.body;

  const user = req.user.username;
console.log(user)
  const find = await User.findOne({ username:user }); // Adjust this based on your use case
  if (!find) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!time || !work ) {
    return res.status(400).json({ error: "Time and work are required" });
  }

  try {
    const result = new model({ time, work ,createat:Date().substring(0,24) });
    let d=await result.save();
    console.log("data",d)
   find.data.push(d._id)
   let y= await find.save();
   console.log(y)
    
    res.status(200).json({ message: "Data saved successfully", result });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// Get data route
app.get("/getdata", jwtMiddleware, async (req, res) => {
  try {
    const user = req.user.username;

  let find = await User.findOne({ username: user }).populate("data") // Adjust the filter accordingly
  res.json({user:user,data:find.data});
  


  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
app.delete("/deletedata/:id", jwtMiddleware, async (req, res) => {
try {
  const id = req.params.id;  // Get the id from params
  console.log("Deleting item with id:", id);
  
  // Find and delete the document
  let t = await model.findByIdAndDelete(id);
  
  if (!t) {
    return res.status(404).json({ message: "Item not found" });
  }
  
  console.log("Deleted item:", t);
  res.status(200).json({ message: "Item deleted successfully", deletedItem: t });

} catch (error) {
  console.error("Error during deletion:", error);
  res.status(500).json({ error: "Internal server error" });
}
});



mongoose
  .connect(process.env.VITE_URL)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.listen(7000, () => {
  console.log("Server connected on port 7000");
});