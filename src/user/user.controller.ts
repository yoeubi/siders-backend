import { User } from './user.entity';
import { UserService } from './user.service';
import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUser(@GetUser() user: User) {
    console.log(user);
    return this.userService.getUser(user.email);
  }
  @Patch()
  updateUser(@GetUser() user: User) {
    return this.userService.updateUser();
  }

  @Delete()
  deleteUser(@GetUser() user: User) {
    return this.userService.deleteUser();
  }
}
