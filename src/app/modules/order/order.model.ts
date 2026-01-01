import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

const OrderSchema = new Schema<IOrder>(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Furniture',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  },
);

const Order = model<IOrder>('Order', OrderSchema);

export default Order;
