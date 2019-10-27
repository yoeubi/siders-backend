import { PassportModule } from '@nestjs/passport';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), PassportModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
