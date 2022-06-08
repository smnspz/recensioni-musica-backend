export const BASE_PATH = process.cwd();
export const DOTENV_PATH = BASE_PATH.concat(
  process.env.NODE_ENV === "prod" ? ".env" : ".env.local"
);
