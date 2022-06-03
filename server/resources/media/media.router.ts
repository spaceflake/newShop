import express from 'express';
import multer from 'multer';
import { auth, admin } from '../../middleware/auth';
import { getAll, getMedia, addMedia, deleteMedia } from './media.controller';

const upload = multer();

export const mediaRouter = express
  .Router()
  .get('/media/files', getAll)
  .get('/media/:id', getMedia)
  .post('/media', auth, admin, upload.single('media'), addMedia)
  .delete('/media/:id', auth, admin, deleteMedia);
