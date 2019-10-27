import { User } from './../user/user.entity';
import { Project } from '../project/project.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  url: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createAt: Date;

  @ManyToOne(type => Project, project => project.images, { eager: false })
  project: Project;

  @ManyToOne(type => User, user => user.images, { eager: false })
  user: User;
}
