import { Image } from './image.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
  async createImages(files: Express.MulterS3.File[]): Promise<Image[]> {
    if (files.length > 0) {
      const images = this.create(
        files.map(file => ({ url: file.location, key: file.key })),
      );
      return await this.save(images);
    }
    return [];
  }

  async createImage(file: Express.MulterS3.File): Promise<Image> {
    const image = this.create({ url: file.location, key: file.key });
    return await this.save(image);
  }
}
