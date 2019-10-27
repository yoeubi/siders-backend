import { Participation } from './../participation/participation.entity';
import { Project } from './../project/project.entity';
import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Entity,
  Unique,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity()
@Unique(['project', 'title'])
export class Position extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  requirement: string;

  @Column('text')
  benefit: string;

  @Column()
  number: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createAt: Date;

  @ManyToOne(type => Project, project => project.positions, { eager: false })
  project: Project;

  @OneToMany(type => Participation, participation => participation.position, {
    eager: true,
  })
  participations: Participation[];
}
