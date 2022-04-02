import { Request, Response } from 'express';

import { CreateUserUseCase } from '@/useCases/CreateUserUseCase';
import { ICreateUserDTO } from '@/dtos/ICreateUserDTO';
import { IUserResponseDTO } from '@/dtos/IUserResponseDTO';

export class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body as ICreateUserDTO;

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({ name, email, password })

    return response.json(user);
  }
}