import { AppError } from '@/errors/AppError';
import { UsersRepository } from '@/repositories/implementations/UsersRepository';
import { IUsersRepository } from '@/repositories/models/IUsersRepository';

export class DeleteUserUseCase {
  private userRepository: IUsersRepository;

  constructor() {
    this.userRepository = new UsersRepository();
  }

  async execute(id: number): Promise<void> {
    if (isNaN(id)) {
      throw new AppError('Invalid ID');
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User was not found');
    }

    return this.userRepository.delete(user.id);
  }
}