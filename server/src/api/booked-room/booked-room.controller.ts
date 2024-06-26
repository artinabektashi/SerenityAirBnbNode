import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookedRoomService } from './booked-room.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookedRoom } from './entities/booked-room.entity';
import { Public } from 'src/common/decorators/public.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { User } from '../user/entities/user.entity';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('bookings')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(PermissionsGuard)
@UseGuards(RolesGuard)
@ApiTags('Bookings')
export class BookedRoomController {
  constructor(private readonly bookedRoomService: BookedRoomService) {}

  @Post('room/:roomId/booking')
  @Public()
  async bookRoom(
    @Param('roomId') roomId: string,
    @Body() createBookingDto: CreateBookingDto,
  ): Promise<BookedRoom> {
    return this.bookedRoomService.bookRoom(roomId, createBookingDto);
  }

  @Get('confirmation/:confirmationCode')
  async getBookingByConfirmationCode(
    @GetCurrentUser() user: User,
    @Param('confirmationCode') confirmationCode: string,
  ): Promise<BookedRoom> {
    return this.bookedRoomService.getBookingByConfirmationCode(
      user.uuid,
      confirmationCode,
    );
  }

  @Get('all-bookings')
  @Public()
  async getAllBookings(): Promise<BookedRoom[]> {
    return this.bookedRoomService.getAllBookings();
  }

  @Delete('booking/:id/delete')
  @Public()
  async cancelBooking(@Param('id') id: string): Promise<void> {
    return this.bookedRoomService.cancelBooking(id);
  }

  @Get('user/:userId/bookings')
  @Public()
  async getBookingsByUserId(
    @Param('userId') userId: string,
  ): Promise<BookedRoom[]> {
    return this.bookedRoomService.getBookingsByUserId(userId);
  }
}
