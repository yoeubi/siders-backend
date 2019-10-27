import { Participation } from 'src/participation/participation.entity';
import { Multers3DeleteUtil } from './../multers3/multers3.delete.util';
import { Image } from './../image/image.entity';
import { UserDTO } from './dto/user.dto';
import { AuthCredentialsDTO } from '../auth/dto/authCredentials.dto';
import { User } from './user.entity';
import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userDTO: UserDTO, image: Image) {
    const user = this.create(userDTO);
    user.images = [image];
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(user.password, user.salt);
    try {
      await this.save(user);
    } catch (error) {
      try {
        await new Multers3DeleteUtil().deleteImagesOnS3(user.images);
      } catch (error) {
        throw error;
      }
      if (error.code === '23505') {
        // duplicate email or username
        const target = error.detail.split('=')[0].replace(/(\(|\))/g, '');
        throw new ConflictException(`${target} already exists`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<string> {
    const { email, password } = authCredentialsDTO;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user.email;
    }
    return null;
  }

  async getUser(email: string) {
    return this.findOne({ email });
  }

  async updateUser(user: User, participation: Participation) {
    user.participations = [participation];
    await this.save(user);
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
