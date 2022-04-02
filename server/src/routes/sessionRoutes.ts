import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { SessionController } from '@/controllers/SessionController';

const sessionController = new SessionController();

const sessionRouter = Router();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create
);

export { sessionRouter };