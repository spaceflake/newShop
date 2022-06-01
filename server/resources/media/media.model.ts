import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

mongoose.connection.on('connected', () => {
    bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'media'
    })
})

export let bucket: GridFSBucket