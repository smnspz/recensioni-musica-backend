import { DOTENV_PATH } from "../config/settings.js";
import * as router from "./routes/_index.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config({ path: DOTENV_PATH });

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router.indexRoutes);
app.use(router.userRoutes);
app.use(router.reviewRoutes);
app.use("/auth", router.authRoutes);

export default app;
