import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: "Resource Not Found",
    error: {
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
    },
  });
};

export default notFound;