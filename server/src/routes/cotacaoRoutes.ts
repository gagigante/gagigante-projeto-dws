import { Router, Request, Response } from 'express';

const cotacaoRouter = Router();

cotacaoRouter.get('/', (request: Request, response: Response) => {
  return response.status(200).json({ hello: 'world' });
});

export { cotacaoRouter };