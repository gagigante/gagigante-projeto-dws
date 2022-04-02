import { Repository } from 'typeorm';

import { appDataSource } from '@/database/data-source';
import { ICotacoesRepository } from '../models/ICotacoesRepository';
import { Cotacao } from '@/entities/Cotacao';

export class CotacoesRepository implements ICotacoesRepository {
  private repository: Repository<Cotacao>;

  constructor() {
    this.repository = appDataSource.getRepository(Cotacao);
  }

  public async findById(id: number): Promise<Cotacao | undefined> {
    const user = await this.repository.findOneBy({ id });

    return user;
  }

  public async findAllByUserId(userId: number): Promise<Cotacao[] | undefined> {
    const cotacoes = await this.repository.find({
      where: {
        user_id: userId
      }
    });

    return cotacoes;
  }

  public create(data: Omit<Cotacao, 'id' | 'user'>): Cotacao {

    const cotacao = this.repository.create(data);

    return cotacao;
  }

  public async save(data: Cotacao): Promise<Cotacao> {
    const cotacao = this.repository.save(data);

    return cotacao;
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
