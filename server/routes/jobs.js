import express from "express";
import jwt from "jsonwebtoken";
import Job from "../models/Job.js";

const router = express.Router();


// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.id; // Save user ID for later
    next();
  });
};


// Apply auth middleware to all routes
router.use(authMiddleware);


// Get all jobs for logged-in user
router.get("/", async (req, res) => {
  const jobs = await Job.find({ userId: req.userId });
  res.json(jobs);
});


// Add new job
router.post("/add", async (req, res) => {
  const { company, link, title, status, date, jobEmail, jobPassword } = req.body;

  const job = new Job({
    userId: req.userId,
    company,
    link,
    title,
    status,
    date,
    jobEmail: jobEmail || "",
    jobPassword: jobPassword || ""
  });


  await job.save();
  res.send("Job added");
});


// Delete job
router.delete("/:id", async (req, res) => {
  await Job.deleteOne({ _id: req.params.id, userId: req.userId });
  res.send("Job deleted");
});

// Update job
router.put("/:id", async (req, res) => {
  const { company, link, title, status, date, jobEmail, jobPassword } = req.body;

  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { company, link, title, status, date, jobEmail, jobPassword },
    { new: true }
  );

  res.json(job);
});

export default router;
