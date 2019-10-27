import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  getUser(email: string) {
    return this.userRepository.getUser(email);
  }

  createUser() {}

  updateUser() {}

  deleteUser() {}
}
