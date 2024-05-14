import { Room } from 'src/api/room/entities/room.entity';
import { AuditEntity } from 'src/common/db/customBaseEntites/AuditEntity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('booked-room')
export class BookedRoom extends AuditEntity {
  @Column()
  num_of_adults: number;

  @Column({ nullable: true })
  num_of_children: number;

  @Column({ nullable: true })
  confirmation_code: string;

  @Column({ nullable: true })
  check_in: Date;

  @Column({ nullable: true })
  check_out: Date;

  @Column({ nullable: true })
  guest_email: string;

  @Column({ nullable: true })
  guest_full_name: string;

  @Column({ nullable: true })
  total_guests: number;

  @ManyToOne(() => Room, (Room: Room) => Room.booked_room)
  room: Room;
}
