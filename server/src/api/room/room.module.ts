import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomRepository } from './repository/room.repository';
import { CustomRepositoryModule } from 'src/common/db/CustomRepository.module';

@Module({
  imports: [CustomRepositoryModule.forCustomRepository([RoomRepository])],
  providers: [RoomService],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {}
