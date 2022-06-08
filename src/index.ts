import { DOTENV_PATH } from "../config/settings.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config({ path: DOTENV_PATH });

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

console.log(process.env.DATABASE_URL);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
