import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { UsersController } from '@/controllers/UserController';
import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated';

const userController = new UsersController();

const userRouter = Router();

userRouter.get('/:id', ensureAuthenticated, userController.show);

userRouter.post(
  '/',  
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  userController.create,
);

export { userRouter };