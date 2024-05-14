import { BaseCustomRepository } from '../../../common/db/customBaseRepository/BaseCustomRepository';
import { CustomRepository } from '../../../common/db/decorators/CustomRepository.decorator';
import { BookedRoom } from '../entities/booked-room.entity';
import { IBookedRoomRepository } from '../interfaces/booked-room.repository.interface';

@CustomRepository(BookedRoom)
export class BookedRoomRepository
  extends BaseCustomRepository<BookedRoom>
  implements IBookedRoomRepository {}
