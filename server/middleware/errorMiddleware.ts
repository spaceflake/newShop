import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';

export class HttpError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log('errorhandler triggered');
  console.error(req.method, req.path, err);

  if (res.writableEnded) {
    return console.error('Sending to client despite err');
  }

  if (
    err instanceof MongooseError.StrictModeError ||
    MongooseError.ValidationError
  ) {
    return res.status(400).json(err.message);
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json(err.message);
  }

  if (err instanceof Error) {
    return res.status(500).json(err.message);
  }
}
