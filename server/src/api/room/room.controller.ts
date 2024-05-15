import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRoomDto } from './dtos/create-room.dto';
import { Room } from './entities/room.entity';
import { RoomService } from './room.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateRoomDto } from './dtos/update-room.dto';
import { multerOptions } from 'src/common/middlewares/multer.middleware';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('room')
@ApiBearerAuth()
@ApiTags('Room')
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(
    @Body() createRoomDto: CreateRoomDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Room> {
    return this.roomService.create(createRoomDto, file);
  }

  @Get()
  async findAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Get('/room-types')
  async findRoomTypes(): Promise<string[]> {
    return this.roomService.getDistinctRoomTypes();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Room> {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Room> {
    return this.roomService.update(id, updateRoomDto, file);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.roomService.remove(id);
  }
}
