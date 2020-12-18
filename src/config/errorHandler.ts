import { ForbiddenError } from "@casl/ability";
import { ErrorRequestHandler } from "express";

export const forbiddenErrorHandler: () => ErrorRequestHandler = () => {
  return (error, req, res, next) => {
    if (error instanceof ForbiddenError) {
      return res.status(403).json({
        status: "forbidden",
        message: error.message
      });
    }
    next();
  };
};

