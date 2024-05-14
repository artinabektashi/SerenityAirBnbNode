import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './repository/role.repository';
import { CustomRepositoryModule } from 'src/common/db/CustomRepository.module';

@Module({
  imports: [CustomRepositoryModule.forCustomRepository([RoleRepository])],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
