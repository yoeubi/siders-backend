import { Module } from '@nestjs/common';
import { Multers3Service } from './multers3.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.registerAsync({ useClass: Multers3Service })],
  providers: [Multers3Service],
  exports: [MulterModule],
})
export class Multers3Module {}
