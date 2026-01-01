import { Router } from 'express';
import { orderController } from './order.controller';
import auth from '../../middleware/auth';

const orderRouter = Router();

orderRouter.post(
  '/create-order',
  auth('user', 'admin'),
  orderController.createOrder,
);
orderRouter.get('/get-order', auth('user', 'admin'), orderController.getOrder);
export default orderRouter;
