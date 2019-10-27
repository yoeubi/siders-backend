import { Image } from './../image/image.entity';
import {
  Injectable,
  UnsupportedMediaTypeException,
  ConflictException,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as MulterS3 from 'multer-s3';
import * as config from 'config';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';

type FileRequest = Express.Request;
type File = Express.Multer.File;
type FileCB = (error: Error | null, accepFile: boolean) => void;
const s3Config = config.get('s3');

@Injectable()
export class Multers3Service implements MulterOptionsFactory {
  private s3: AWS.S3;
  private readonly FILE_LIMIT_SIZE = 3145728;
  constructor() {
    this.s3 = new AWS.S3();
    AWS.config.update({
      accessKeyId: process.env.S3_ACCESS_KEY_ID || s3Config.accessKey,
      secretAccessKey:
        process.env.S3_SECRET_ACCESS_KEY || s3Config.secretAccessKey,
      region: 'ap-northeast-2',
    });
  }
  createMulterOptions(): MulterModuleOptions {
    const bucket: string = process.env.S3_BUCKET_NAME || s3Config.bucketName;
    const acl: string = `public-read`;
    const multerS3Storage = MulterS3({
      s3: this.s3,
      bucket,
      acl,
      contentType: MulterS3.AUTO_CONTENT_TYPE,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, `${Date.now().toString()}-${file.originalname}`);
      },
    });
    return {
      storage: multerS3Storage,
      fileFilter: this.fileFilter,
      limits: {
        fileSize: this.FILE_LIMIT_SIZE,
      },
    };
  }
  fileFilter(req: FileRequest, file: File, cb: FileCB) {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(new UnsupportedMediaTypeException(``), false);
    }
  }
}
