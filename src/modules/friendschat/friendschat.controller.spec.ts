import { Test, TestingModule } from '@nestjs/testing';
import { FriendschatController } from './friendschat.controller';
import { FriendschatService } from './friendschat.service';

describe('FriendschatController', () => {
  let controller: FriendschatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendschatController],
      providers: [FriendschatService],
    }).compile();

    controller = module.get<FriendschatController>(FriendschatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
