import { Participation } from './../participation/participation.entity';
import { Position } from './../position/position.entity';
import { Image } from '../image/image.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  goal: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  deleteAt: Date;

  @OneToMany(type => Image, image => image.project, {
    eager: true,
  })
  images: Image[];

  @OneToMany(type => Position, position => position.project, { eager: true })
  positions: Position[];

  @OneToMany(type => Participation, participation => participation.project, {
    eager: true,
  })
  participations: Participation[];
}
