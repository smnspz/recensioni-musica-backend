import { DOTENV_PATH } from "../config/settings.js";
import dotenv from "dotenv";
import express from "express";

dotenv.config({ path: DOTENV_PATH });

const app = express();
const port = process.env.PORT || 3000;

console.log(process.env.DATABASE_URL);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
