import { Position } from './../position/position.entity';
import { Project } from './../project/project.entity';
import { User } from './../user/user.entity';
import { ParticipationStatus } from './enum/participation.status.enum';
import { ParticipationRole } from './enum/participation.role.enum';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity()
export class Participation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ParticipationRole,
    default: ParticipationRole.PARTICIPANT,
  })
  role: ParticipationRole;

  @Column({
    type: 'enum',
    enum: ParticipationStatus,
    default: ParticipationStatus.WAITING,
  })
  status: ParticipationStatus;

  @ManyToOne(type => User, user => user.participations, { eager: false })
  user: User;

  @ManyToOne(type => Project, project => project.participations, {
    eager: false,
  })
  project: Project;

  @ManyToOne(type => Position, position => position.participations, {
    eager: false,
  })
  position: Position;
}
