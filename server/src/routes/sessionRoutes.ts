import { Router, Request, Response } from 'express';

const sessionRouter = Router();

sessionRouter.post('/', (request: Request, response: Response) => {
  return response.status(200).json({ hello: 'world' });
});


export { sessionRouter };