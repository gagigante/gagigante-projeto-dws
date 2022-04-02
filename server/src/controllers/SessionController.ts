import { Request, Response } from 'express';

import { AuthenticateUserUseCase } from '@/useCases/AuthenticateUserUseCase';

export class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserUseCase();

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}