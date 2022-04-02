import { Router, Request, Response } from 'express';

import { sessionRouter } from './sessionRoutes';
import { userRouter } from './userRoutes';
import { cotacaoRouter } from './cotacaoRoutes';

const routes = Router();

routes.use('/session', sessionRouter);
routes.use('/usuarios', userRouter);
routes.use('/cotacoes', cotacaoRouter);

export { routes };