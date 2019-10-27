import { PipeTransform } from '@nestjs/common';

export class PositionNumberPipe implements PipeTransform {
  transform(value: any) {
    value.positions = value.positions.map(position => {
      if (position.number) {
        position.number = Number(position.number);
      }
      return position;
    });
    return value;
  }
}
