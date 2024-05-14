/* eslint-disable @typescript-eslint/no-empty-interface */
import { IBaseCustomRepository } from '../../../common/db/customBaseRepository/interfaces/BaseCustomRepository.interface';
import { Room } from '../entities/room.entity';

export interface IRoomRepository extends IBaseCustomRepository<Room> {}
