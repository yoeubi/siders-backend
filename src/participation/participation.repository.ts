import { Participation } from './participation.entity';
import { Repository, EntityRepository } from 'typeorm';
import { ParticipationRole } from './enum/participation.role.enum';
import { ParticipationStatus } from './enum/participation.status.enum';

@EntityRepository(Participation)
export class ParticipationRepository extends Repository<Participation> {
  async createParticipation() {
    const participation = this.create();
    participation.role = ParticipationRole.ORGANIZER;
    participation.status = ParticipationStatus.CONFRIM;
    return await this.save(participation);
  }
}
