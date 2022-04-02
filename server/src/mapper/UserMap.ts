import { instanceToInstance } from 'class-transformer';

import { User } from '@/entities/User';
import { IUserResponseDTO } from '@/dtos/IUserResponseDTO';

class UserMap {
  static toDTO({ id, name, email }: User): IUserResponseDTO {
    const user = instanceToInstance({ id, name, email });

    return user;
  }
}

export { UserMap };
