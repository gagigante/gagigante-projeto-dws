import { Request, Response } from 'express';

import { GetUserCotacoesUseCase } from '@/useCases/GetUserCotacoesUseCase';
import { ProcessCotacaoUseCase } from '@/useCases/ProcessCotacaoUseCase';
import { ICreateCotacaoDTO } from '@/dtos/ICreateCotacaoDTO';
import { ISaveCotacaoDTO } from '@/dtos/ISaveCotacaoDTO';
import { CreateCotacaoUseCase } from '@/useCases/CreateCotacaoUseCase';

export class CotacaoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const getUserCotacoesUseCase = new GetUserCotacoesUseCase();

    const cotacoes = await getUserCotacoesUseCase.execute(id);

    return response.json(cotacoes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { productName, productPrice, paymentType, portionPrice } = request.body as ISaveCotacaoDTO;

    const createCotacaoUseCase = new CreateCotacaoUseCase();

    const cotacao = await createCotacaoUseCase.execute({
      userId: id, 
      productName,
      productPrice,
      paymentType,
      portionPrice,
    });

    return response.json(cotacao);
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