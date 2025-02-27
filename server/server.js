import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import session from "express-session";
import { placeRoutes, userRoutes, hotelRoutes, reviewRoutes } from "./routes/routes.js";
import { fileURLToPath } from "url";
import { jwtToken } from './middlewares/verifyToken.js';
import passport from "./middlewares/passport.Middleware.js";
import { isAdmin } from "./middlewares/roleMiddleware.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const port = process.env.PORT;
connectDB();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());

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

app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({ extended: false }));
const HOST = "0.0.0.0"; // Bind to all network interfaces


app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/places", placeRoutes);
app.use("/api/v1/hotels",jwtToken, hotelRoutes);
app.use("/api/v1/reviews", jwtToken,reviewRoutes);


app.listen(port, HOST,() => console.log(`App listening on port ${port}!`));
