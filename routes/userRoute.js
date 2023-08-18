import express from 'express';
import * as UserService from '../services/user.js';

const userRouter = express.Router();
userRouter.get('/',UserService.validateToken ,UserService.getUsers);
userRouter.post('/', UserService.createUser);
userRouter.post('/login', UserService.authUser);

export default userRouter;