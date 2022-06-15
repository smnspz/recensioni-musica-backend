import jwt from "jsonwebtoken";

export const getJsonFromJWT = (token: string) => {
  const decodedToken = jwt.decode(token);
  return JSON.parse(JSON.stringify(decodedToken));
};
