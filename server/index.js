import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors(
  { origin: "http://localhost:5173", 
    credentials: true }
  ));
  
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log("Server running on port 5000 and connected to MongoDB")))
  .catch(err => console.error(err));