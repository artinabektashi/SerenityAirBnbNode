import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Validate } from 'class-validator';
import { IsUnique } from '../../../common/decorators/validation.decorator';
import { User } from '../../user/entities/user.entity';

export class RegisterDTO {
  @IsString()
  @ApiProperty()
  first_name: string;

  @IsString()
  @ApiProperty()
  last_name: string;

  @IsEmail()
  @Validate(IsUnique, [User])
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}
