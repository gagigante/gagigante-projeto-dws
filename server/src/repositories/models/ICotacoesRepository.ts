import { ICreateCotacaoDTO } from '@/dtos/ICreateCotacaoDTO';
import { Cotacao } from '@/entities/Cotacao';

export interface ICotacoesRepository {
  findAllByUserId(userId: number): Promise<Cotacao[]>
  create(data: ICreateCotacaoDTO): Cotacao;
  save(cotacao: Cotacao): Promise<Cotacao>;
  delete(id: number): Promise<void>;
}