import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Validate,
} from 'class-validator';
import {
  IsUnique,
  SameAs,
} from '../../../common/decorators/validation.decorator';
import { User } from '../../user/entities/user.entity';
import { UserGender } from '../../user/enums/userGender.enum';
import { UserRoles } from '../../user/enums/roles.enum';

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
