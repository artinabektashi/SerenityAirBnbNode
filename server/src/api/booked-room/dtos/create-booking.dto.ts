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
  num_of_adults: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  num_of_children?: number;

  @ApiProperty()
  @IsDate()
  check_in: Date;

  @ApiProperty()
  @IsDate()
  check_out: Date;

  @ApiProperty()
  @IsEmail()
  guest_email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  guest_full_name: string;
}
