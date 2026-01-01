import Furniture from '../furniture/furniture.model';
import Order from './order.model';
import { Types } from 'mongoose';
import { IOrder } from './order.interface';

const createOrder = async (payload: {
  userId: string;
  products: { product: string; quantity: number }[];
}) => {
  if (!payload?.products?.length) throw new Error('Order is not specified');

  let totalPrice = 0;

  const productDetails: IOrder['products'] = (
    await Promise.all(
      payload.products.map(async (item) => {
        const product = await Furniture.findById(item.product);
        if (!product) return null;

        totalPrice += (product.price || 0) * item.quantity;

        return {
          product: new Types.ObjectId(item.product),
          quantity: item.quantity,
        };
      }),
    )
  ).filter(
    (p): p is { product: Types.ObjectId; quantity: number } => p !== null,
  );

  if (!productDetails.length) throw new Error('No valid products found');

  const order: IOrder = await Order.create({
    user: new Types.ObjectId(payload.userId),
    products: productDetails,
    totalPrice,
    status: 'Pending',
  });

  return { order };
};

const getOrder = async () => {
  const result = await Order.find().populate('user', 'name email');
  return result;
};

export const orderService = {
  createOrder,
  getOrder,
};
