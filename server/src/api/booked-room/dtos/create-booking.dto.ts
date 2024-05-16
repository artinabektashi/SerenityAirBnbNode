import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @ApiProperty()
  @IsNumber()
  numOfAdults: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  numOfChildren?: number;

  @ApiProperty()
  @IsDate()
  checkInDate: Date;

  @ApiProperty()
  @IsDate()
  checkOutDate: Date;

  @ApiProperty()
  @IsEmail()
  guestEmail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  guestFullName: string;
}
