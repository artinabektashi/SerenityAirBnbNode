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
  Query,
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
import { Public } from 'src/common/decorators/public.decorator';
import { FilterDto } from './dtos/filter.dto';

@Controller('rooms')
@ApiBearerAuth()
@ApiTags('Room')
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('add/new-room')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(
    @Body() createRoomDto: CreateRoomDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Room> {
    return this.roomService.create(createRoomDto, file);
  }

  @Public()
  @Get('all-rooms')
  async findAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Public()
  @Get('available-rooms')
  async findAvailableRooms(@Query() filterDto: FilterDto): Promise<Room[]> {
    return this.roomService.getAvailableRooms(filterDto);
  }

  @Get('/room/types')
  @Public()
  async findRoomTypes(): Promise<string[]> {
    return this.roomService.getDistinctRoomTypes();
  }

  @Get('room/:id')
  @Public()
  async findOne(@Param('id') id: string): Promise<Room> {
    return this.roomService.findOne(id);
  }

  @Put('update/:id')
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
    @UploadedFile() photo?: Express.Multer.File,
  ): Promise<Room> {
    return this.roomService.update(id, updateRoomDto, photo);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.roomService.remove(id);
  }
}
