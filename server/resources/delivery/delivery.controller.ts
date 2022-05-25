import { NextFunction, Request, Response } from 'express';
import { DeliveryModel, Delivery } from './delivery.model';

export const getAllDeliverys = async (req: Request, res: Response) => {
  const deliverys = await DeliveryModel.find({});
  res.status(200).json(deliverys);
};
export const getDelivery = async (req: Request, res: Response) => {
  const { id } = req.body;
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
export const updateDelivery = async (req: Request, res: Response) => {
  const deliverys = await DeliveryModel.find({});
  res.status(200).json(deliverys);
};
export const deleteDelivery = async (req: Request, res: Response) => {
  const deliverys = await DeliveryModel.find({});
  res.status(200).json(deliverys);
};
