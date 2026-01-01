import { Request, Response } from 'express';
import { orderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  const payload = req.body;
  const order = await orderService.createOrder(payload);
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

export const orderController = {
  createOrder,
  getOrder,
};
