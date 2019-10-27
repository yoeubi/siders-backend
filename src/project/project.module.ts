import { ParticipationRepository } from './../participation/participation.repository';
import { PositionRepository } from './../position/position.repository';
import { ImageRepository } from './../image/image.repository';
import { Multers3Module } from './../multers3/multers3.module';
import { AuthModule } from './../auth/auth.module';
import { ProjectRepository } from './project.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectRepository,
      ImageRepository,
      PositionRepository,
      ParticipationRepository,
    ]),
    AuthModule,
    PassportModule,
    Multers3Module,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
