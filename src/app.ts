import { DOTENV_PATH } from "../config/settings";
import { userRoutes } from "./routes/_index";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config({ path: DOTENV_PATH });

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRoutes);

export default app;
