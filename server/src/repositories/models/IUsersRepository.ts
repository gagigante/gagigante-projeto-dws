import { ICreateUserDTO } from '@/dtos/ICreateUserDTO';
import { User } from '@/entities/User';

export interface IUsersRepository {
  findById(id: number): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): User;
  save(user: User): Promise<User>;
  delete(id: number): Promise<void>;
}