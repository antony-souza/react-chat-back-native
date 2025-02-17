import { Test, TestingModule } from '@nestjs/testing';
import { FriendschatService } from './friendschat.service';

describe('FriendschatService', () => {
  let service: FriendschatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendschatService],
    }).compile();

    service = module.get<FriendschatService>(FriendschatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
