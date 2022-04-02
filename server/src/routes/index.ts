import { Router, Request, Response } from 'express';

import { sessionRouter } from './sessionRoutes';
import { userRouter } from './userRoutes';
import { cotacaoRouter } from './cotacaoRoutes';

const routes = Router();

routes.use('/session', sessionRouter);
routes.use('/usuario', userRouter);
routes.use('/cotacao', cotacaoRouter);

export { routes };