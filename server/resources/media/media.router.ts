import express from 'express';
import multer from 'multer';
import { getAll, getMedia, addMedia, deleteMedia } from './media.controller';

const upload = multer();

export const mediaRouter = express
  .Router()
  .get('/media/files', getAll)
  .get('/media/:id', getMedia)
  .post('/media', upload.single('media'), addMedia)
  .delete('/media/:id', deleteMedia);
