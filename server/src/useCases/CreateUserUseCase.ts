import { UsersRepository } from '@/repositories/implementations/UsersRepository';
import { UserMap } from '@/mapper/UserMap';
import { AppError } from '@/errors/AppError';
import { ICreateUserDTO } from '@/dtos/ICreateUserDTO';
import { IUserResponseDTO } from '@/dtos/IUserResponseDTO';
import { IUsersRepository } from '@/repositories/models/IUsersRepository';

export class CreateUserUseCase {
  private userRepository: IUsersRepository;

  constructor() {
    this.userRepository = new UsersRepository();
  }

  async execute({ name, email, password }: ICreateUserDTO): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new AppError("User already exists");
    }

    const newUser = this.userRepository.create({ name, email, password });

    await this.userRepository.save(newUser); 

    return UserMap.toDTO(newUser);
  }
}