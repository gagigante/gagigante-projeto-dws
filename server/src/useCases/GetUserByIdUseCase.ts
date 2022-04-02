import { UsersRepository } from '@/repositories/implementations/UsersRepository';
import { UserMap } from '@/mapper/UserMap';
import { AppError } from '@/errors/AppError';
import { IUsersRepository } from '@/repositories/models/IUsersRepository';
import { IUserResponseDTO } from '@/dtos/IUserResponseDTO';

export class GetUserByIdUseCase {
  private userRepository: IUsersRepository;

  constructor() {
    this.userRepository = new UsersRepository();
  }

  async execute(id: number): Promise<IUserResponseDTO> {
    if (isNaN(id)) {
      throw new AppError('Invalid ID');
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User was not found');
    }

    return UserMap.toDTO(user);
  }
}