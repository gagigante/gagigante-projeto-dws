import { ICreateUserDTO } from '@/dtos/ICreateUserDTO';
import { User } from '@/entities/User';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): User;
  save(user: User): Promise<User>;
}