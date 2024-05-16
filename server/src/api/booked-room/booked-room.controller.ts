import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookedRoomService } from './booked-room.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookedRoom } from './entities/booked-room.entity';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('bookings')
@ApiBearerAuth()
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

  @Get('confirmation/:confirmationCode')
  @Public()
  async getBookingByConfirmationCode(
    @Param('confirmationCode') confirmationCode: string,
  ): Promise<BookedRoom> {
    return this.bookedRoomService.getBookingByConfirmationCode(
      confirmationCode,
    );
  }
}
