import { Request, Response } from 'express';
import { HttpError } from '../../middleware/errorMiddleware';
import { updateStock } from '../product';
import { OrderModel } from './order.model';

declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await OrderModel.find({});
    if (!orders) {
    throw new HttpError(404, 'Orders not found')
  }

  res.status(200).json(orders);
};
export const getOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await OrderModel.findById(id);
    if (!order) {
    throw new HttpError(404, 'Orders not found')
  }

  res.status(200).json(order);
};

export const getSpecUserOrders = async (req: Request, res: Response) => {
  const user = req.params;
  const userOrders = await OrderModel.find({ user: user?.id });
  if (!userOrders) {
    throw new HttpError(404, 'User orders not found')
  }
  res.status(200).json(userOrders);
};

export const addOrder = async (
  req: Request,
  res: Response,
) => {
  const order = new OrderModel({
    ...req.body,
    user: req.user,
  });

  if (!order) {
    throw new HttpError(404, 'Order not found');
  }

  await order.save();
  // update stock on products
  await updateStock(order);

  res.status(200).json({ success: true, order });
};
export const updateOrder = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const order = await OrderModel.findById(id);

  if (!order) {
    throw new HttpError(404, 'Order not found');
  }

  const updatedOrderStatus = await OrderModel.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    success: true,
    msg: 'Order updated as sent',
    data: updatedOrderStatus,
  });
};
