import { IsString, IsPositive, IsNumber, IsNotEmpty } from 'class-validator';

export class PositionDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  requirement: string;

  @IsNotEmpty()
  @IsString()
  benefit: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  number: number;
}
