import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookedRoomRepository } from './repository/booked-room.repository';
import { RoomService } from '../room/room.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookedRoom } from './entities/booked-room.entity';
import { UserService } from '../user/user.service';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class BookedRoomService {
  constructor(
    private readonly bookedRoomRepository: BookedRoomRepository,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
  ) {}

  async bookRoom(
    roomId: string,
    createBookingDto: CreateBookingDto,
  ): Promise<BookedRoom> {
    const room = await this.roomService.findOne(roomId);
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const confirmationCode = Math.random().toString(36).substring(2, 10);

    await this.roomService.updateIsBookedStatus(roomId, true);

    const totalGuests =
      createBookingDto.numOfAdults + (createBookingDto.numOfChildren || 0);

    const { checkInDate, checkOutDate } = createBookingDto;

    const isRoomAvailable = await this.checkRoomAvailability(
      roomId,
      checkInDate,
      checkOutDate,
    );
    if (!isRoomAvailable) {
      throw new ConflictException(
        'Room is not available for the selected dates',
      );
    }

    const bookedRoom = this.bookedRoomRepository.create({
      ...createBookingDto,
      room: room,
      totalGuests: totalGuests,
      confirmationCode: confirmationCode,
    });

    return this.bookedRoomRepository.save(bookedRoom);
  }

  async getAllBookings(): Promise<BookedRoom[]> {
    return this.bookedRoomRepository.find({ relations: { room: true } });
  }

  async cancelBooking(bookingId: string): Promise<void> {
    const booking = await this.bookedRoomRepository.findOne({
      where: { uuid: bookingId },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    await this.bookedRoomRepository.remove(booking);
  }

  async getBookingsByUserId(userId: string): Promise<BookedRoom[]> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.bookedRoomRepository.find({
      where: { guestEmail: user.email },
      relations: { room: true },
    });
  }

  async getBookingByConfirmationCode(
    userId: string,
    confirmationCode: string,
  ): Promise<BookedRoom> {
    const user = await this.userService.findOne(userId);

    const booking = await this.bookedRoomRepository.findOne({
      where: { confirmationCode: confirmationCode },
      relations: { room: true },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (booking.guestEmail !== user.email) {
      throw new ForbiddenException(
        'You are not authorized to access this booking',
      );
    }
    return booking;
  }

  private async checkRoomAvailability(
    roomId: string,
    checkIn: Date,
    checkOut: Date,
  ): Promise<boolean> {
    const overlappingBooking = await this.bookedRoomRepository.findOne({
      where: {
        room: { uuid: roomId },
        checkInDate: LessThanOrEqual(checkOut),
        checkOutDate: MoreThanOrEqual(checkIn),
      },
    });
    return !overlappingBooking;
  }
}
