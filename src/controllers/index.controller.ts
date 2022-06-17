import { Request, Response } from "express";

const indexController = async (req: Request, res: Response) => {
  let baseUrl: string;
  if (process.env.NODE_ENV === "production") {
    baseUrl = process.env.BASE_URL;
  } else {
    baseUrl = `${process.env.HOST}/${process.env.PORT}`;
  }
  return res.json({
    message: `Go to ${baseUrl}/signup to sign up or ${baseUrl}/login to login`,
  });
};

export default indexController;
