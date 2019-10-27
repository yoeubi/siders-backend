import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { Multers3Module } from './multers3/multers3.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProjectModule,
    AuthModule,
    UserModule,
    Multers3Module,
  ],
})
export class AppModule {}
