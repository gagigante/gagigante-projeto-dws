import { UsersRepository } from '@/repositories/implementations/UsersRepository';
import { UserMap } from '@/mapper/UserMap';
import { AppError } from '@/errors/AppError';
import { ICreateUserDTO } from '@/dtos/ICreateUserDTO';
import { IUserResponseDTO } from '@/dtos/IUserResponseDTO';
import { IUsersRepository } from '@/repositories/models/IUsersRepository';
import { IHashProvider } from '@/providers/HashProvider/models/IHashProvider';
import { BCryptHashProvider } from '@/providers/HashProvider/implementations/BCryptHashProvider';

export class CreateUserUseCase {
  private userRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor() {
    this.userRepository = new UsersRepository();
    this.hashProvider = new BCryptHashProvider();
  }

  async execute({ name, email, password }: ICreateUserDTO): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new AppError("User already exists");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const newUser = this.userRepository.create({ name, email, password: hashedPassword });

    await this.userRepository.save(newUser); 

    return UserMap.toDTO(newUser);
  }
}