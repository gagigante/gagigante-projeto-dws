import { Request, Response } from 'express';

import { CreateUserUseCase } from '@/useCases/CreateUserUseCase';
import { GetUserByIdUseCase } from '@/useCases/GetUserByIdUseCase';
import { DeleteUserUseCase } from '@/useCases/DeleteUserUseCase';
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

  public async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const deleteUserUseCase = new DeleteUserUseCase();

    await deleteUserUseCase.execute(id);

    return response.status(200).send();
  }
}