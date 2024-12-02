// Third party imports
import { Request, Response, NextFunction } from "express";

// User imports
import { AppError } from "@mono/utils";

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "dev") {
    console.log(err);
  }

  let statusCode: number = 500;
  let message: string = "";

  if (err instanceof AppError) {
    ({ message, statusCode } = err);
  } else if (err.name === "PayloadTooLargeError") {
    statusCode = 400;
    message = "The request payload exceeds the allowable size for processing.";
  }

  res.status(statusCode).json({
    status: AppError.getStatus(statusCode),
    message,
  });
};
