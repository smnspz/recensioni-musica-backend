export const BASE_PATH = process.cwd();
export const DOTENV_PATH = BASE_PATH.concat(
  process.env.node_env === "prod" ? ".env.prod" : ".env.local"
);
