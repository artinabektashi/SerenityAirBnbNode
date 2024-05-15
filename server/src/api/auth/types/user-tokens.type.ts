import { User } from '../../user/entities/user.entity';

export type TTokensUser = {
  token: string;
  refreshToken: string;
  user: User;
};
