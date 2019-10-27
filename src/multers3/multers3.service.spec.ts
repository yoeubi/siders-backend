import { Test, TestingModule } from '@nestjs/testing';
import { Multers3Service } from './multers3.service';

describe('Multers3Service', () => {
  let service: Multers3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Multers3Service],
    }).compile();

    service = module.get<Multers3Service>(Multers3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
