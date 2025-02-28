import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import { StatusCodes } from 'http-status-codes';

const defaultErrorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  _next: NextFunction
) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({ message: error.message });
    return;
  }

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Something went wrong.' });
};

export default defaultErrorHandler;
