import { Router } from 'express';

import { CotacaoController } from '@/controllers/CotacaoController';
import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated';

const cotacaoController = new CotacaoController();

const cotacaoRouter = Router();

cotacaoRouter.get('/', ensureAuthenticated, cotacaoController.index);

export { cotacaoRouter };