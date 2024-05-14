import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.findOne(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    Object.assign(room, updateRoomDto);
    return this.roomRepository.save(room);
  }

  async remove(id: string): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
