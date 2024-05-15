import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { UserGender } from '../../../../api/user/enums/userGender.enum';
import { In } from 'typeorm';
import { User } from '../../../../api/user/entities/user.entity';
import AppDataSource from '../../dataSource/data-source.initialize';

@Injectable()
export class UsersSeeder implements Seeder {
  async seed(): Promise<any> {
    const userRepository = AppDataSource.getRepository(User);

    const users = userRepository.create([
      {
        first_name: 'Artina',
        last_name: 'B',
        email: `artina@gmail.com`,
        username: `Artina`,
        password:
          '$2b$10$nwibVTEz86tgqAAmQNY2eOkppbDvlAhfae1azWUdx9wBx5vbnpwQC',
        gender: UserGender.FEMALE,
        phone: '+383447323202',
      },
    ]);
    await userRepository.save(users);
  }

  async drop(): Promise<any> {
    const userRepository = AppDataSource.getRepository(User);
    const emails = ['artina@gmail.com'];
    await userRepository.delete({ email: In(emails) });
  }
}

// seeder({
//   imports: [TypeOrmModule.forRoot(config as DataSourceOptions)],
// }).run([UsersSeeder]);
