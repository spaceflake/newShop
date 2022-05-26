import { NextFunction, Request, Response } from "express";
import { GridFSFile } from "mongodb";
import { Types } from "mongoose";
import { Readable } from "stream";
import { bucket } from "./media.model";
import sharp from 'sharp';
// import { rmSync, write } from 'fs';


export const getMedia = async (req: Request, res: Response) => {
    const _id = new Types.ObjectId(req.params.id);
    const file = await bucket.find({ _id }).next();
    if (!file || !file.contentType) {
      return res.status(404).json('media file with this id does not exist');
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
      return;
    }
  
    const { originalname, mimetype, buffer } = req.file;
    const thumbname = 'thumb ' + originalname;
  
    const readableStream = Readable.from(buffer);
    const writableStream = bucket.openUploadStream(originalname, {
      contentType: mimetype,
      metadata: { thumbnail: false }
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
    res.status(200).json("DELETED MEDIA");
};