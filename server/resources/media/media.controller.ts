import { NextFunction, Request, Response } from 'express';
import { GridFSFile } from 'mongodb';
import mongoose, { Types } from 'mongoose';
import { Readable } from 'stream';
import { bucket } from './media.model';
import sharp from 'sharp';
import { HttpError } from '../../middleware/errorMiddleware';
// import { rmSync, write } from 'fs';

export const getAll = async (req: Request, res: Response) => {
  const files = await bucket.find().toArray();
  if (!files || files.length === 0) {
    throw new HttpError(404, 'Files not found');
  }

  res.status(200).json({
    success: true,
    files,
  });
};

export const getMedia = async (req: Request, res: Response) => {
  const _id = new mongoose.Types.ObjectId(req.params.id);
  const file = await bucket.find({ _id }).next();
  if (!file || !file.contentType) {
    throw new HttpError(404, 'File with this id could not be found');
  }

  res.setHeader('Content-Type', file.contentType);

  const readableStream = bucket.openDownloadStream(_id);
  readableStream.pipe(res);
};

export const addMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
      throw new HttpError(404, 'File not found');
  }

  const { originalname, mimetype, buffer } = req.file;

  const readableStream = Readable.from(buffer);
  const writableStream = bucket.openUploadStream(originalname, {
    contentType: mimetype,
  });

  const transformer = sharp().resize({
      width: 500,
      height: 850,
      fit: 'fill',
      position: sharp.strategy.entropy,
    })

  readableStream
    .pipe(transformer)
    .pipe(writableStream)
    .on('finish', (file: GridFSFile) => {
      console.log('done', file);
      res.status(201).json(file);
    })
    .on('error', next);
};

export const deleteMedia = (req: Request, res: Response) => {
  bucket.delete(new mongoose.Types.ObjectId(req.params.id), (err) => {
    if (err) {
      return res.status(404).json({ err });
    }

    res.status(200).json({
      success: true,
      message: `File with ID ${req.params.id} is deleted`,
    });
  });
};
