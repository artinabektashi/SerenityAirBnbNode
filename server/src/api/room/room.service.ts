import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dtos/create-room.dto';
import { Room } from './entities/room.entity';
import { UpdateRoomDto } from './dtos/update-room.dto';
import { RoomRepository } from './repository/room.repository';
import { multerConfig } from 'src/common/middlewares/multer.middleware';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async create(
    createRoomDto: CreateRoomDto,
    file?: Express.Multer.File,
  ): Promise<Room> {
    const apiUrl = process.env.APP_URL.endsWith('/api')
      ? process.env.APP_URL.slice(0, -4)
      : process.env.APP_URL;
    const filePath = `${apiUrl}/${multerConfig.dest}/${file.filename}`;

    const room = this.roomRepository.create({
      ...createRoomDto,
      photo: filePath,
    });

    return this.roomRepository.save(room);
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async findOne(id: string): Promise<Room> {
    return this.roomRepository.findOne({ where: { uuid: id } });
  }

  async update(
    id: string,
    updateRoomDto: UpdateRoomDto,
    file?: Express.Multer.File,
  ): Promise<Room> {
    let room = await this.findOne(id);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    room = {
      ...room,
      ...updateRoomDto,
    };

    if (file) {
      const apiUrl = process.env.APP_URL.endsWith('/api')
        ? process.env.APP_URL.slice(0, -4)
        : process.env.APP_URL;
      const filePath = `${apiUrl}/${multerConfig.dest}/${file.filename}`;
      room.photo = filePath;
    }

    return this.roomRepository.save(room);
  }

  async remove(id: string): Promise<void> {
    const room = await this.findOne(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    await this.roomRepository.remove(room);
  }

  async getDistinctRoomTypes(): Promise<string[]> {
    const rooms = await this.roomRepository.find();

    const distinctRoomTypes = [...new Set(rooms.map((room) => room.room_type))];

    return distinctRoomTypes;
  }

  async updateIsBookedStatus(roomId: string, isBooked: boolean): Promise<Room> {
    const room = await this.findOne(roomId);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    room.is_booked = isBooked;
    return this.roomRepository.save(room);
  }

  async getAvailableRooms(
    checkIn: Date,
    checkOut: Date,
    roomType?: string,
  ): Promise<Room[]> {
    let query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect(
        'room.booked_room',
        'bookedRoom',
        'bookedRoom.check_out < :checkIn OR bookedRoom.check_in > :checkOut',
        { checkIn, checkOut },
      );

    if (roomType) {
      query = query.where('room.room_type = :roomType', { roomType });
    }

    return query.getMany();
  }
}
