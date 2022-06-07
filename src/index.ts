import { DOTENV_PATH } from "config/settings";
import dotenv from "dotenv";
import express from "express";

dotenv.config({ path: DOTENV_PATH });

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
