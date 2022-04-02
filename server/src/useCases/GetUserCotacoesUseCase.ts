import { AppError } from '@/errors/AppError';
import { ICotacoesRepository } from '@/repositories/models/ICotacoesRepository';
import { CotacoesRepository } from '@/repositories/implementations/CotacoesRepository';
import { Cotacao } from '@/entities/Cotacao';

export class GetUserCotacoesUseCase {
  private cotacoesRepository: ICotacoesRepository;

  constructor() {
    this.cotacoesRepository = new CotacoesRepository();
  }

  async execute(id: number): Promise<Cotacao[]> {
    if (isNaN(id)) {
      throw new AppError('Invalid ID');
    }

    const cotacoes = await this.cotacoesRepository.findAllByUserId(id);

    return cotacoes;
  }
}