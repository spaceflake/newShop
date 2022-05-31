import { Types } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
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
  res.status(200).json(orders);
};
export const getOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await OrderModel.findById(id);
  res.status(200).json(order);
};
export const addOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = new OrderModel({
      ...req.body,
      user: req.user,
    });
    console.log(order);

    await order.save();
    res.status(200).json({ success: true, order });
  } catch (err) {
    next(err);
  }
};
export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const orderOption = await OrderModel.findById(id);

    if (!orderOption) {
      // res.status(400).json('Order option not found');
      throw new Error('Order option not found');
    }

    const updatedOrderOption = await OrderModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: 'Order option updated',
      data: updatedOrderOption,
    });
  } catch (error) {
    next(error);
  }
};
