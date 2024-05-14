/* eslint-disable @typescript-eslint/no-empty-interface */
import { IBaseCustomRepository } from '../../../common/db/customBaseRepository/interfaces/BaseCustomRepository.interface';
import Role from '../entities/role.entity';

export interface IRoleRepository extends IBaseCustomRepository<Role> {}
