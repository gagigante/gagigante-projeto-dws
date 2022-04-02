import { instanceToInstance } from 'class-transformer';

import { User } from '@/entities/User';
import { UserResponseDTO } from '@/dtos/UserResponseDTO';

class UserMap {
  static toDTO({ id, name, email }: User): UserResponseDTO {
    const user = instanceToInstance({ id, name, email });

    return user;
  }
}

export { UserMap };
