import { sign } from 'jsonwebtoken';

import { UsersRepository } from '@/repositories/implementations/UsersRepository';
import { BCryptHashProvider } from '@/providers/HashProvider/implementations/BCryptHashProvider';
import { IUsersRepository } from '@/repositories/models/IUsersRepository';
import { IHashProvider } from '@/providers/HashProvider/models/IHashProvider';
import { authConfig } from '@/config/auth';
import { AppError } from '@/errors/AppError';
import { UserMap } from '@/mapper/UserMap';
import { IUserResponseDTO } from '@/dtos/IUserResponseDTO';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  user: IUserResponseDTO;
  token: string;
}

export class AuthenticateUserUseCase {
  private userRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor() {
    this.userRepository = new UsersRepository();
    this.hashProvider = new BCryptHashProvider();
  }

  public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({
      subject: user.id,
      expiresIn
    }, secret);

    return {
      user: UserMap.toDTO(user),
      token,
    };
  }
}
