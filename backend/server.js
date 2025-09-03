import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

const app = express();

const allowedOrigins = [process.env.CLIENT_URL];

const isVercelPreview = (origin) =>
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin || "");

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      console.log(
        "CORS policy: No origin provided (likely a non-browser request)"
      );
    } else {
      console.log("CORS policy: Origin provided:", origin);
    }

    if (!origin || allowedOrigins.includes(origin) || isVercelPreview(origin)) {
      console.log(
        "CORS policy: Allowing origin:",
        origin,
        allowedOrigins.includes(origin),
        isVercelPreview(origin)
      );
      callback(null, true);
    } else {
      callback(new Error("CORS policy: This origin is not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// parse JSON bodies
app.use(express.json());

export default app;
