/* eslint-disable @typescript-eslint/no-empty-interface */
import { IBaseCustomRepository } from '../../../common/db/customBaseRepository/interfaces/BaseCustomRepository.interface';
import { BookedRoom } from '../entities/booked-room.entity';

export interface IBookedRoomRepository
  extends IBaseCustomRepository<BookedRoom> {}
