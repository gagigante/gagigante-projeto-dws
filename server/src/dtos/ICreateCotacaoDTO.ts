export interface ICreateCotacaoDTO {
  userId: number;
  productName: string;
  productPrice: number;
  paymentType: 'mensal' | 'trimestral' | 'anual';
}