import { connectDB } from "./database/db.js";
import express from "express";
import {authRouter} from "./routes/login.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
connectDB();

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use("/api/authenticate", authRouter);

app.listen("3000", () => {
  console.log("Server running on port 3000");
});