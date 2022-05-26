import { NextFunction, Request, Response } from 'express';
import { DeliveryModel, Delivery } from './delivery.model';

export const getAllDeliverys = async (req: Request, res: Response) => {
  const deliverys = await DeliveryModel.find({});
  res.status(200).json(deliverys);
};
export const getDelivery = async (req: Request, res: Response) => {
  const { id } = req.params;
  const delivery = await DeliveryModel.findById(id);
  res.status(200).json(delivery);
};
export const addDelivery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const delivery = new DeliveryModel(req.body);
    await delivery.save();
    res.status(200).json(delivery);
  } catch (err) {
    next(err);
  }
};
export const updateDelivery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const deliveryOption = await DeliveryModel.findById(id);

    if (!deliveryOption) {
      // res.status(400).json('Delivery option not found');
      throw new Error('Delivery option not found');
    }

    const updatedDeliveryOption = await DeliveryModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: 'Delivery option updated',
      data: updatedDeliveryOption,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteDelivery = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id || req.body.isAdmin) {
    try {
      const deliveryOption = await DeliveryModel.findByIdAndDelete(id);
      return res.status(200).json('DELETED DELIVERY OPTION');
    } catch (err) {
      return res.status(500).json('error');
    }
  } else {
    return res.status(403).json('can not delete ');
  }
};
