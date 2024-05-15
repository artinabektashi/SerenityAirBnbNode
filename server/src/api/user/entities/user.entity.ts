import { Exclude } from 'class-transformer';
import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { UserGender } from '../enums/userGender.enum';
import { UserRoles } from '../enums/roles.enum';
import { AuditEntity } from '../../../common/db/customBaseEntites/AuditEntity';
import Role from 'src/api/role/entities/role.entity';

@Entity('users')
export class User extends AuditEntity {
  @Column({ default: false })
  isRoleOverridden: boolean;

  @Column({ type: 'integer', default: 1 })
  permissions: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  hashedRt: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: UserGender,
    default: UserGender.OTHER,
  })
  gender: UserGender;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  timezone: string;

  @Column({
    type: 'enum',
    default: UserRoles.USER,
    enum: UserRoles,
  })
  role: UserRoles;

  @ManyToMany(() => Role, (roles) => roles.users)
  @JoinTable()
  roles: Role[];
}
