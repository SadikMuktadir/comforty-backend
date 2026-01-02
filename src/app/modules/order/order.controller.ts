import { Request, Response } from 'express';
import { orderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  const user = req.user;
  const order = await orderService.createOrder(user, req.body, req.ip!);
  res.status(201).send({
    success: true,
    message: 'Order Created Succesfully',
    data: order,
  });
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getOrder();
    res.status(201).send({
      success: true,
      message: 'Order get Succesfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Order is not get',
      error: error,
    });
  }
};

const verifyPayment = async (req: Request, res: Response) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);
  res.status(201).send({
    success: true,
    message: 'Order verify Succesfully',
    data: order,
  });
};

export const orderController = {
  createOrder,
  getOrder,
  verifyPayment,
};
