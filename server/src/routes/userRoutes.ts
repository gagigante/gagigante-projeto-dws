import { Router, Request, Response } from 'express';

const userRouter = Router();

userRouter.get('/', (request: Request, response: Response) => {
  return response.status(200).json({ hello: 'world' });
});

export { userRouter };