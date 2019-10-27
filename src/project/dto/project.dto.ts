import { PositionDTO } from './../../position/dto/position.dto';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProjectDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  goal: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PositionDTO)
  positions: PositionDTO[];
}
