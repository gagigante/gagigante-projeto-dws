import { Repository } from 'typeorm';

import { appDataSource } from '@/database/data-source';
import { User } from '@/entities/User';
import { IUsersRepository } from '../models/IUsersRepository';
import { ICreateUserDTO } from '@/dtos/ICreateUserDTO';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = await this.repository.findOneBy({ id });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOneBy({ email });

    return user;
  }

  public create(data: ICreateUserDTO): User {
    const user = this.repository.create(data);

    return user;
  }

  public async save(data: User): Promise<User> {
    const user = this.repository.save(data);

    return user;
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
