import { Types } from 'mongoose';

export interface IOrder {
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}
