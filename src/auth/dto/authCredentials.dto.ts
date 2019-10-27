import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class AuthCredentialsDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
