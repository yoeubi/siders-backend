import { Image } from './../image/image.entity';
import * as aws from 'aws-sdk';
import * as config from 'config';
import { ConflictException } from '@nestjs/common';

const s3Config = config.get('s3');

export class Multers3DeleteUtil {
  private s3: AWS.S3;
  constructor() {
    this.s3 = new aws.S3();
  }
  deleteImagesOnS3(images: Image[]): Promise<aws.S3.DeleteObjectOutput> {
    const Objects = images.map(image => ({ Key: image.key }));
    return new Promise((resolve, reject) => {
      this.s3.deleteObjects(
        {
          Bucket: process.env.S3_BUCKET_NAME || s3Config.bucketName,
          Delete: { Objects },
        },
        (error, data) => {
          if (error) {
            reject(
              new ConflictException(
                `S3 Image ID: ${JSON.stringify(
                  Objects.join(', '),
                )} not deleted`,
              ),
            );
          }
          resolve(data);
        },
      );
    });
  }
}
