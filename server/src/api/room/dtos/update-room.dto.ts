import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRoomDto {
  @ApiProperty()
  @IsOptional()
  is_booked: boolean;

  @ApiProperty()
  @IsOptional()
  room_price: number;

  @IsString()
  @ApiProperty()
  @IsOptional()
  room_type: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  photo: string;
}
