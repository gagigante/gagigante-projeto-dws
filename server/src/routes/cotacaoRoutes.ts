import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { CotacaoController } from '@/controllers/CotacaoController';
import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated';

const cotacaoController = new CotacaoController();

const cotacaoRouter = Router();

cotacaoRouter.get('/', ensureAuthenticated, cotacaoController.index);

cotacaoRouter.post(
  '/', 
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      productName: Joi.string().required(),
      productPrice: Joi.number().required(),
      paymentType: Joi.string().valid('mensal', 'trimestral', 'anual'),
      portionPrice: Joi.number().required(),
    },
  }),
  cotacaoController.create
);

cotacaoRouter.post(
  '/processamento', 
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      productName: Joi.string().required(),
      productPrice: Joi.number().required(),
      paymentType: Joi.string().valid('mensal', 'trimestral', 'anual'),
    },
  }),
  cotacaoController.process
);

cotacaoRouter.delete('/:id', ensureAuthenticated, cotacaoController.destroy);

export { cotacaoRouter };