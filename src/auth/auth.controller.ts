import { UserDTO } from './../user/dto/user.dto';
import { AuthCredentialsDTO } from './dto/authCredentials.dto';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // 로그인
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    console.log(authCredentialsDTO);

    return this.authService.signIn(authCredentialsDTO);
  }

  // 회원가입
  @Post('/signup')
  @UseInterceptors(FileInterceptor('file'))
  signUp(
    @Body(ValidationPipe) userDTO: UserDTO,
    @UploadedFile() file: Express.MulterS3.File,
  ): Promise<void> {
    return this.authService.signUp(userDTO, file);
  }
}
