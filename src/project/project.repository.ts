import { Participation } from './../participation/participation.entity';
import { Multers3DeleteUtil } from './../multers3/multers3.delete.util';
import { Position } from './../position/position.entity';
import { Image } from '../image/image.entity';
import { ProjectDTO } from './dto/project.dto';
import { Project } from './project.entity';
import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async createProject(
    projectDTO: ProjectDTO,
    images: Image[],
    positions: Position[],
    participation: Participation,
  ) {
    const project = this.create(projectDTO);
    project.images = images;
    project.positions = positions;
    project.participations = [participation];
    try {
      await this.save(project);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate project
        if (images.length > 0) {
          try {
            await new Multers3DeleteUtil().deleteImagesOnS3(images);
          } catch (error) {
            throw error;
          }
        }
        throw new ConflictException('ProjectId, title already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return project;
  }
}
