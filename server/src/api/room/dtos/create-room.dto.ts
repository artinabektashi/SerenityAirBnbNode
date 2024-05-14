import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty()
  is_booked: boolean;

  @ApiProperty()
  room_price: number;

  @IsString()
  @ApiProperty()
  room_type: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  photo?: string;
}
