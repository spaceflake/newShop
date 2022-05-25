import { NextFunction, Request, Response } from "express";
import { GridFSFile } from "mongodb";
import { Types } from "mongoose";
import { Readable } from "stream";
import { bucket } from "./media.model";

export const getMedia = async (req: Request, res: Response) => {
    const _id = new Types.ObjectId(req.params.id);
    const file = await bucket.find({ _id }).next();
    if (!file || !file.contentType) {
      return res
        .status(404)
        .json(`File with ID: ${req.params.id} does not exist`);
    }
  
    res.setHeader("Content-Type", file.contentType);
  
    const readableStream = bucket.openDownloadStream(_id);
    readableStream.pipe(res);

};



export const addMedia = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        console.error("")
        return res.status(400).json("")
    }

    const readableStream = Readable.from(req.file.buffer)
    const writeableStream = bucket.openUploadStream(req.file.originalname, { contentType: req.file.mimetype })

    readableStream.pipe(writeableStream).on('finish', (file: GridFSFile) => {
        console.log('DONE!', file)
        res.status(201).json(file);
    })
};

export const deleteMedia = (req: Request, res: Response) => {
    res.status(200).json("DELETED MEDIA");
};