import { NextFunction, Request, Response } from "express";
import { ApiResponse, logger } from "../common/utils/index";
import { JsonWebTokenError, TokenExpiredError, NotBeforeError } from "jsonwebtoken";
import {
  ValidationError,
  Error,
  AccessDeniedError,
  AggregateError,
  AssociationError,
  AsyncQueueError,
  BaseError,
  BulkRecordError,
  ConnectionError,
  ConnectionRefusedError,
  ConnectionTimedOutError,
  EagerLoadingError,
  EmptyResultError,
  ExclusionConstraintError,
  ForeignKeyConstraintError,
  HostNotFoundError,
  HostNotReachableError,
  InvalidConnectionError,
  OptimisticLockError,
  SequelizeScopeError,
} from "sequelize";
// import { ResponseError } from "@sendgrid/mail";

//* /* Create error handler function */
const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
  //* Log error
  logger.warn(`ERROR at PATH: [${req.path}] METHOD: [${req.method}] MESSAGE: [${err.message}]`);

  //* Handling JSON syntax error
  if (err instanceof SyntaxError && err.message.includes("JSON")) return ApiResponse.BAD_REQUEST({ res, message: "Invalid JSON syntax" });

  //* Handling jsonwebtoken error
  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError || err instanceof NotBeforeError) return ApiResponse.UNAUTHORIZED({ res, message: err.message });

  //* Handling sequelize error
  if (
    err instanceof ValidationError ||
    err instanceof Error ||
    err instanceof AccessDeniedError ||
    err instanceof AggregateError ||
    err instanceof AssociationError ||
    err instanceof AsyncQueueError ||
    err instanceof BaseError ||
    err instanceof BulkRecordError ||
    err instanceof ConnectionError ||
    err instanceof ConnectionRefusedError ||
    err instanceof ConnectionTimedOutError ||
    err instanceof EagerLoadingError ||
    err instanceof EmptyResultError ||
    err instanceof ExclusionConstraintError ||
    err instanceof ForeignKeyConstraintError ||
    err instanceof HostNotFoundError ||
    err instanceof HostNotReachableError ||
    err instanceof InvalidConnectionError ||
    err instanceof OptimisticLockError ||
    err instanceof SequelizeScopeError
  )
    return ApiResponse.UNAUTHORIZED({ res, message: err.message });

  //* Handling sendgrid error
  // if (err instanceof ResponseError) return ApiResponse.BAD_REQUEST({ res, message: err.message });

  logger.error(`STACK_ERROR: ${err}`);

  return ApiResponse.CATCH_ERROR({ res, message: err.message });
};

export default errorHandler;
