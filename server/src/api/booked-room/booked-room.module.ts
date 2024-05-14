import { Module } from '@nestjs/common';
import { BookedRoomService } from './booked-room.service';
import { BookedRoomController } from './booked-room.controller';
import { BookedRoomRepository } from './repository/booked-room.repository';
import { CustomRepositoryModule } from 'src/common/db/CustomRepository.module';

@Module({
  imports: [CustomRepositoryModule.forCustomRepository([BookedRoomRepository])],
  providers: [BookedRoomService],
  controllers: [BookedRoomController],
})
export class BookedRoomModule {}
