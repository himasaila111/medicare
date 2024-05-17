import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";

// config
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: ["https://medicare-app-zeta.vercel.app", "http://localhost:5173"],
methods: ["POST", "GET"],
credentials: true
};

app.get("/", (req, res) => {
  res.send("HELLO MEDICARE");
});

// middleware
app.use(express.json()); // used to convert to json from string
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);

// database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected");
  } catch (error) {
    console.error("Database Connection Error:", error); // Log the error message
  }
};

// App listening
app.listen(port, () => {
  connectDB();
  console.log("Server is running on port " + port);
});
