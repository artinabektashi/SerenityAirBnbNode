import { BookedRoom } from 'src/api/booked-room/entities/booked-room.entity';
import { AuditEntity } from 'src/common/db/customBaseEntites/AuditEntity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('room')
export class Room extends AuditEntity {
  @Column({ default: false })
  is_booked: boolean;

  @Column({ nullable: true })
  room_price: number;

  @Column({ nullable: true })
  room_type: string;

  @Column({ nullable: true })
  photo: string;

  @OneToMany(() => BookedRoom, (bookedRoom) => bookedRoom.room, {
    onDelete: 'CASCADE',
  })
  booked_room: BookedRoom[];
}
