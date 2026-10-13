import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Auth server running at http://localhost:${PORT}`);
  console.log(`Allowed frontend: ${process.env.FRONTEND_URL}`);
});
