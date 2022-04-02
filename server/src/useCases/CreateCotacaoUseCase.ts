import { ISaveCotacaoDTO } from '@/dtos/ISaveCotacaoDTO';
import { Cotacao } from '@/entities/Cotacao';
import { AppError } from '@/errors/AppError';
import { CotacoesRepository } from '@/repositories/implementations/CotacoesRepository';
import { UsersRepository } from '@/repositories/implementations/UsersRepository';
import { ICotacoesRepository } from '@/repositories/models/ICotacoesRepository';
import { IUsersRepository } from '@/repositories/models/IUsersRepository';

interface IRequestDTO extends ISaveCotacaoDTO {
  userId: number;
}

export class CreateCotacaoUseCase {
  private usersRepository: IUsersRepository;

  private cotacoesRepository: ICotacoesRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
    this.cotacoesRepository = new CotacoesRepository();
  }

  async execute({ 
    userId, 
    productName, 
    productPrice, 
    paymentType,
    portionPrice,
  }: IRequestDTO): Promise<Cotacao> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User was not found');
    }

    const cotacao = this.cotacoesRepository.create({ 
      user_id: user.id,
      productName,
      productPrice,
      paymentType,
      portionPrice
    });

    await this.cotacoesRepository.save(cotacao);

    return cotacao;
  }
}