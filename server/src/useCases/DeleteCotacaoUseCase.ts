import { AppError } from '@/errors/AppError';
import { CotacoesRepository } from '@/repositories/implementations/CotacoesRepository';
import { UsersRepository } from '@/repositories/implementations/UsersRepository';
import { ICotacoesRepository } from '@/repositories/models/ICotacoesRepository';
import { IUsersRepository } from '@/repositories/models/IUsersRepository';

export class DeleteCotacaoUseCase {
  private usersRepository: IUsersRepository;

  private cotacoesRepository: ICotacoesRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
    this.cotacoesRepository = new CotacoesRepository();
  }

  async execute(cotacaoId: number, userId: number): Promise<void> {
    if (isNaN(cotacaoId) || isNaN(userId)) {
      throw new AppError('Invalid ID');
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Invalid User');
    }

    const cotacao = await this.cotacoesRepository.findById(cotacaoId);

    if (!cotacao) {
      throw new AppError('Item was not found');
    }

    if (cotacao.user_id !== userId) {
      throw new AppError('Item was not found');
    }

    return this.cotacoesRepository.delete(cotacao.id);
  }
}