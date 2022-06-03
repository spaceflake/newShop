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
  const thumbname = 'thumb ' + originalname;

  const readableStream = Readable.from(buffer);
  const writableStream = bucket.openUploadStream(originalname, {
    contentType: mimetype,
    metadata: { thumbnail: false },
  });
  bucket.openUploadStream(thumbname, {
    contentType: mimetype,
    metadata: { thumbnail: true },
  });

  const onFinishUpload = (file: GridFSFile) => {
    images.push(file);
    if (images.length === 2) {
      res.status(201).json(images);
    }
  };

  const transformer = sharp();

  const images: GridFSFile[] = [];

  transformer
    .resize({
      width: 500,
      height: 500,
      fit: 'cover',
      position: sharp.strategy.entropy,
    })
    .pipe(writableStream)
    .on('finish', onFinishUpload);

  readableStream
    .pipe(writableStream)
    .on('finish', (file: GridFSFile) => {
      console.log('done', file);
      res.status(201).json(file);
    })
    .on('error', next);

  readableStream.pipe(transformer).on('error', next);
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
