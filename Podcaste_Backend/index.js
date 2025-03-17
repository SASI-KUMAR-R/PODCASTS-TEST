const express = require("express");
const mdb = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");
const multer = require("multer");
const app = express();
const port = 3001;
app.use(cors());
dotenv.config();
app.use(express.json());

const Signup = require("./Models/SignUpSchema");
const Podcast = require("./Models/PodcastDetails");

mdb
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("SERVER STARTED AND CONNECTED WITH DATABASE");
  })
  .catch((error) => {
    console.error("DATABASE CONNECTION ERROR:", error);
  });

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ---------------- SIGNUP ROUTE ----------------
app.post("/signup", async (req, res) => {
  try {
    const { username, emailid, password, phonenumber } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const newSignup = new Signup({
      username,
      emailid,
      password: hashedPass,
      phonenumber,
    });

    await newSignup.save();
    console.log("SIGNUP SUCCESS");
    res.status(201).json({ message: "SIGNUP SUCCESS", isSignup: true });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(400).json({ message: "SIGNUP FAILED", isSignup: false });
  }
});

// ---------------- LOGIN ROUTE----------------
app.post("/login", async (req, res) => {
  try {
    const { emailid, password } = req.body;
    const user = await Signup.findOne({ emailid });

    if (!user) {
      return res.status(400).json({ message: "USER NOT FOUND", isLogin: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      console.log("LOGIN SUCCESS");
      return res.status(200).json({ 
        message: "LOGIN SUCCESS", 
        isLogin: true, 
        userid: user._id  
      });
    } else {
      return res.status(400).json({ message: "INVALID PASSWORD", isLogin: false });
    }
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "INTERNAL SERVER ERROR", isLogin: false });
  }
});

// ---------------- ADD PODCAST ROUTE ----------------
app.post(
  "/addpodcast",
  upload.fields([{ name: "image" }, { name: "audio" }]),
  async (req, res) => {
    try {
      const { userid, title, description } = req.body;

      if (!userid || !title || !description || !req.files["image"] || !req.files["audio"]) {
        return res.status(400).json({ message: "All fields are required", success: false });
      }

      const image = req.files["image"][0].buffer.toString("base64");
      const audio = req.files["audio"][0].buffer.toString("base64");

      const newPodcast = new Podcast({ userid, title, description, image, audio });

      await newPodcast.save();
      console.log("PODCAST ADDED SUCCESSFULLY");

      res.status(201).json({ message: "Podcast added successfully", success: true });
    } catch (error) {
      console.error("Error uploading podcast:", error);
      res.status(500).json({ message: "Internal Server Error", success: false });
    }
  }
);

// ---------------- FETCH USER PODCASTS ROUTE ----------------
app.get("/mypodcasts/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    if (!userid) {
      return res.status(400).json({ message: "User ID is required", success: false });
    }

    const podcasts = await Podcast.find({ userid });

    if (!podcasts.length) {
      return res.status(404).json({ message: "No podcasts found", success: false });
    }

    res.status(200).json({ success: true, podcasts });
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

// ---------------- FETCH ALL PODCASTS ROUTE ----------------
app.get("/allpodcasts", async (req, res) => {
  try {
    const podcasts = await Podcast.find();
    
    if (!podcasts.length) {
      return res.status(404).json({ message: "No podcasts found", success: false });
    }

    res.status(200).json({ success: true, podcasts });
  } catch (error) {
    console.error("Error fetching all podcasts:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});


// ---------------- SERVER LISTENING ----------------
app.listen(port, () => console.log(`Server started on port ${port}`));
