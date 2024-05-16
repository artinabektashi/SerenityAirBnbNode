import { Room } from 'src/api/room/entities/room.entity';
import { AuditEntity } from 'src/common/db/customBaseEntites/AuditEntity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('booked-room')
export class BookedRoom extends AuditEntity {
  @Column()
  numOfAdults: number;

  @Column({ nullable: true })
  numOfChildren: number;

  @Column({ nullable: true })
  confirmationCode: string;

  @Column({ nullable: true })
  checkInDate: Date;

  @Column({ nullable: true })
  checkOutDate: Date;

  @Column({ nullable: true })
  guestEmail: string;

  @Column({ nullable: true })
  guestFullName: string;

  @Column({ nullable: true })
  totalGuests: number;

  @ManyToOne(() => Room, (Room: Room) => Room.booked_room, {
    onDelete: 'CASCADE',
  })
  room: Room;
}
