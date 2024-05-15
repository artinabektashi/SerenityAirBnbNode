import { User } from 'src/api/user/entities/user.entity';
import { AuditEntity } from 'src/common/db/customBaseEntites/AuditEntity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('role')
export default class Role extends AuditEntity {
  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
