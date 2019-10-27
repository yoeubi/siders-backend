import { PositionDTO } from './dto/position.dto';
import { Position } from './position.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Position)
export class PositionRepository extends Repository<Position> {
  async createPosition(positionDTO: PositionDTO[]) {
    const position = this.create(positionDTO);
    return await this.save(position);
  }
}
