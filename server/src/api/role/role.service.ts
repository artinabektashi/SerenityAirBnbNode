import { Injectable } from '@nestjs/common';
import { RoleRepository } from './repository/role.repository';
import { CreateRoleDto } from './dto/create-role.dto';
import Role from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { uuid: id } });
  }
}
