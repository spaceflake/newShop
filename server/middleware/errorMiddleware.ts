import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from "mongoose";


export class HttpError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _: NextFunction
) {
  console.error(req.method, req.path, err)

  if (res.writableEnded) {
    return console.error(
      "Response has been sent to client even though there was an error"
    );
  }

  if (err instanceof MongooseError.StrictModeError || err instanceof MongooseError.ValidationError) {
    return res.status(400).json(err.message);
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json(err.message);
  }

  if (err instanceof Error) {
//status/statuscode doesnt exist on type Error?    let status = err.status || err.statusCode || 500;
    return res.status(500).json(err.message);
  }
};