import Furniture from '../furniture/furniture.model';
import Order from './order.model';
import { Types } from 'mongoose';
import { orderUtils } from './order.utils';
import { IUser } from '../auth/auth.interfave';

const createOrder = async (
  user: IUser,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string,
) => {
  if (!payload.products.length) {
    throw new Error('Order is not specified');
  }

  let totalPrice = 0;
  const productDetails: { product: Types.ObjectId; quantity: number }[] = [];

  for (const item of payload.products) {
    const product = await Furniture.findById(item.product);
    if (!product) continue;

    totalPrice += (product.price ?? 0) * item.quantity;

    productDetails.push({
      product: product._id,
      quantity: item.quantity,
    });
  }

  if (!productDetails.length) {
    throw new Error('No valid products found');
  }

  // Create order
  const order = await Order.create({
    user: user._id,
    products: productDetails,
    totalPrice,
    status: 'Pending',
  });

  // Prepare payment payload
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id.toString(),
    currency: 'BDT',
    customer_name: user.name || 'Unknown',
    customer_address: user.address || 'N/A',
    customer_email: user.email || 'no-reply@example.com',
    customer_phone: user.phone || '0000000000',
    customer_city: user.city || 'N/A',
    client_ip,
  };

  // Make payment
  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  // Update order with transaction info if available
  if (payment?.transactionStatus) {
    await Order.findByIdAndUpdate(order._id, {
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  // Fetch the full order document including product details
  const fullOrder = await Order.findById(order._id).populate(
    'products.product',
    'name price',
  );

  if (!fullOrder) {
    throw new Error('Order not found after creation');
  }

  // Return full order + checkout URL
  return {
    ...fullOrder.toObject(),
    checkout_url: payment.checkout_url || null,
  };
};

const getOrder = async () => {
  const result = await Order.find().populate('user', 'name email');
  return result;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};
export const orderService = {
  createOrder,
  getOrder,
  verifyPayment,
};
