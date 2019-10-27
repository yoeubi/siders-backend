import { ImageRepository } from './../image/image.repository';
import { UserDTO } from './../user/dto/user.dto';
import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsDTO } from './dto/authCredentials.dto';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { TransactionRepository, Transaction } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signIn(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    const email = await this.userRepository.validateUserPassword(
      authCredentialsDTO,
    );
    if (!email) {
      throw new UnauthorizedException(`Invalid credentials`);
    }
    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  @Transaction()
  async signUp(
    userDTO: UserDTO,
    file: Express.MulterS3.File,
    @TransactionRepository() userRepository?: UserRepository,
    @TransactionRepository() imageRepository?: ImageRepository,
  ): Promise<void> {
    const image = await imageRepository.createImage(file);
    return await userRepository.signUp(userDTO, image);
  }
}
