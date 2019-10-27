import { ParticipationRepository } from './../participation/participation.repository';
import { UserRepository } from './../user/user.repository';
import { PositionRepository } from './../position/position.repository';
import { ImageRepository } from './../image/image.repository';
import { User } from '../user/user.entity';
import { Project } from './project.entity';
import { ProjectDTO } from './dto/project.dto';
import { ProjectRepository } from './project.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository, Transaction } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,
  ) {}
  async getProjects(): Promise<Project[]> {
    return this.projectRepository.find({
      where: { deleteAt: null },
    });
  }
  async getProjectById(id: number): Promise<Project> {
    const found = await this.projectRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Project ID: ${id} not found`);
    }
    return found;
  }
  @Transaction()
  async createProject(
    projectDTO: ProjectDTO,
    files: Express.MulterS3.File[],
    user: User,
    @TransactionRepository() userRepository?: UserRepository,
    @TransactionRepository() participationRepository?: ParticipationRepository,
    @TransactionRepository() positionRepository?: PositionRepository,
    @TransactionRepository() imageRepository?: ImageRepository,
    @TransactionRepository() projectRepository?: ProjectRepository,
  ): Promise<Project> {
    const participation = await participationRepository.createParticipation();
    const positions = await positionRepository.createPosition(
      projectDTO.positions,
    );
    const images = await imageRepository.createImages(files);
    const project = await projectRepository.createProject(
      projectDTO,
      images,
      positions,
      participation,
    );
    await userRepository.updateUser(user, participation);
    console.log(user);

    return project;
  }
  async updateProject(
    id: number,
    projectDTO: ProjectDTO,
    user: User,
  ): Promise<Project> {
    const project = await this.setProject(
      await this.getProjectById(id),
      projectDTO,
    );
    await project.save();
    return project;
  }
  async deleteProject(id: number, user: User): Promise<void> {
    const result = await this.getProjectById(id);
    result.deleteAt = new Date();
    await result.save();
  }

  setProject(project, projectDTO: ProjectDTO) {
    const { title, description, goal } = projectDTO;
    project.title = title;
    project.description = description;
    project.goal = goal;
    return project;
  }
}
