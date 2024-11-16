// Third party imports
import { Request, Response, NextFunction } from "express";

// User imports
import { AppError } from "@mono/utils";

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode: number = 500;
  let message: string = "";

  if (err instanceof AppError) {
    ({ message, statusCode } = err);
  } else {
  }

  res.status(statusCode).json({
    status: AppError.getStatus(statusCode),
    message,
  });
};
