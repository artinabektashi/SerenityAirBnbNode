import { BaseCustomRepository } from '../../../common/db/customBaseRepository/BaseCustomRepository';
import { CustomRepository } from '../../../common/db/decorators/CustomRepository.decorator';
import { Room } from '../entities/room.entity';
import { IRoomRepository } from '../interfaces/room.repository.interface';

@CustomRepository(Room)
export class RoomRepository
  extends BaseCustomRepository<Room>
  implements IRoomRepository {}
