import { AuditEntity } from 'src/common/db/customBaseEntites/AuditEntity';
import { Column, Entity } from 'typeorm';

@Entity('role')
export default class Role extends AuditEntity {
  @Column()
  name: string;
}
