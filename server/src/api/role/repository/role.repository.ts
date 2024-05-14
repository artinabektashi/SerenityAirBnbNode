import { BaseCustomRepository } from '../../../common/db/customBaseRepository/BaseCustomRepository';
import { CustomRepository } from '../../../common/db/decorators/CustomRepository.decorator';
import Role from '../entities/role.entity';
import { IRoleRepository } from '../interfaces/role.repository.interface';

@CustomRepository(Role)
export class RoleRepository
  extends BaseCustomRepository<Role>
  implements IRoleRepository {}
