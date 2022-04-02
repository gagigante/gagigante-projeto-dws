import { ICreateCotacaoDTO } from '@/dtos/ICreateCotacaoDTO';
import { Cotacao } from '@/entities/Cotacao';
import { AppError } from '@/errors/AppError';
import { CotacoesRepository } from '@/repositories/implementations/CotacoesRepository';
import { UsersRepository } from '@/repositories/implementations/UsersRepository';
import { ICotacoesRepository } from '@/repositories/models/ICotacoesRepository';
import { IUsersRepository } from '@/repositories/models/IUsersRepository';

export class ProcessCotacaoUseCase {
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
    paymentType 
  }: ICreateCotacaoDTO): Promise<Cotacao> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User was not found');
    }

    let portionPrice: number;

    if (paymentType === 'mensal') {
      portionPrice = (productPrice * 0.08) / 12;
    }

    if (paymentType === 'trimestral') {
      portionPrice = (productPrice * 0.07) / 4;
    }

    if (paymentType === 'anual') {
      portionPrice = productPrice * 0.05;
    }

    const cotacao = this.cotacoesRepository.create({ 
      user_id: user.id,
      productName,
      productPrice,
      paymentType,
      portionPrice
    });

    return cotacao;
  }
}