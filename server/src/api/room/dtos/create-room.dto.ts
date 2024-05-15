import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
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
