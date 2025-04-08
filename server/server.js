import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import {
  placeRoutes,
  userRoutes,
  hotelRoutes,
  reviewRoutes,
  AuthRoutes
} from "./routes/index.js";
import { fileURLToPath } from "url";
import { passport, isAdmin, jwtToken } from "./middlewares/index.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT;
connectDB();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET_ID,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
    },
  })
);



app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
const HOST = process.env.HOST // Bind to all network interfaces

app.use("/", AuthRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/places", placeRoutes);
app.use("/api/v1/hotels", jwtToken, hotelRoutes);
app.use("/api/v1/reviews", jwtToken, reviewRoutes);

app.listen(PORT, HOST, () => console.log(`App listening on port ${PORT}!`));
