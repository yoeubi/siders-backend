import { PositionNumberPipe } from './../position/pipe/position-number.pipe';
import { User } from '../user/user.entity';
import { Project } from './project.entity';
import { ProjectDTO } from './dto/project.dto';
import { ProjectService } from './project.service';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Delete,
  Body,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('project')
export class ProjectController {
  constructor(private projectServide: ProjectService) {}
  @Get()
  getProjects(): Promise<Project[]> {
    return this.projectServide.getProjects();
  }

  @Get('/:id')
  getProjectById(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectServide.getProjectById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('files'))
  async createProject(
    @Body(PositionNumberPipe, ValidationPipe)
    createProject: ProjectDTO,
    @UploadedFiles() files: Express.MulterS3.File[],
    @GetUser() user: User,
  ): Promise<Project> {
    return this.projectServide.createProject(createProject, files, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateProject: ProjectDTO,
    @GetUser() user: User,
  ): Promise<Project> {
    return this.projectServide.updateProject(id, updateProject, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteProject(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.projectServide.deleteProject(id, user);
  }
}
