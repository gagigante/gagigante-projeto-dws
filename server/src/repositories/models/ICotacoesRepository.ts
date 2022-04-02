import { Cotacao } from '@/entities/Cotacao';

export interface ICotacoesRepository {
  findById(id: number): Promise<Cotacao | undefined>
  findAllByUserId(userId: number): Promise<Cotacao[]>
  create(data: Omit<Cotacao, 'id' | 'user'>): Cotacao;
  save(cotacao: Cotacao): Promise<Cotacao>;
  delete(id: number): Promise<void>;
}