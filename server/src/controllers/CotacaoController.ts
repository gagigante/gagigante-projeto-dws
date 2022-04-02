import { Request, Response } from 'express';

import { GetUserCotacoesUseCase } from '@/useCases/GetUserCotacoesUseCase';
import { ProcessCotacaoUseCase } from '@/useCases/ProcessCotacaoUseCase';
import { ICreateCotacaoDTO } from '@/dtos/ICreateCotacaoDTO';

export class CotacaoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const getUserCotacoesUseCase = new GetUserCotacoesUseCase();

    const cotacoes = await getUserCotacoesUseCase.execute(id);

    return response.json(cotacoes);
  }

  public async process(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { productName, productPrice, paymentType } = request.body as ICreateCotacaoDTO

    const processCotacaoUseCase = new ProcessCotacaoUseCase();

    const cotacao = await processCotacaoUseCase.execute({
      userId: id,
      productName,
      productPrice,
      paymentType,
    });

    return response.json(cotacao);
  }
}