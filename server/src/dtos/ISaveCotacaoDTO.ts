export interface ISaveCotacaoDTO {
  productName: string;
  productPrice: number;
  paymentType: 'mensal' | 'trimestral' | 'anual';
  portionPrice: number;
}
