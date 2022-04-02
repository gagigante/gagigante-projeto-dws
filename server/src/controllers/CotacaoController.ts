import { Request, Response } from 'express';

import { GetUserCotacoesUseCase } from '@/useCases/GetUserCotacoesUseCase';

export class CotacaoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const getUserCotacoesUseCase = new GetUserCotacoesUseCase();

    const cotacoes = await getUserCotacoesUseCase.execute(id);

    return response.json(cotacoes);
  }
}