import { Request, Response } from 'express';

import { CreateUserUseCase } from '@/useCases/CreateUserUseCase';
import { GetUserByIdUseCase } from '@/useCases/GetUserByIdUseCase';
import { ICreateUserDTO } from '@/dtos/ICreateUserDTO';

export class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getUserByIdUseCase = new GetUserByIdUseCase();

    const user = await getUserByIdUseCase.execute(Number(id));
    
    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body as ICreateUserDTO;

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({ name, email, password })

    return response.json(user);
  }
}