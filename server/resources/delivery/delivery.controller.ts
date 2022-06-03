import { Request, Response } from 'express';
import { HttpError } from '../../middleware/errorMiddleware';
import { Delivery, DeliveryModel } from './delivery.model';

export const getAllDeliverys = async (req: Request, res: Response) => {
  const deliveries = await DeliveryModel.find({});

  if (!deliveries) {
    throw new Error('Could not retrieve delivery methods');
  }

  res.status(200).json(deliveries);
};
export const getDelivery = async (req: Request, res: Response) => {
  const { id } = req.params;
  const delivery = await DeliveryModel.findById(id);

  if (!delivery) {
    throw new HttpError(404, 'Could not retrieve delivery method');
  }

  res.status(200).json(delivery);
};
export const addDelivery = async (
  req: Request<{}, {}, Delivery>,
  res: Response,
) => {
  const delivery = new DeliveryModel(req.body);

  if (!delivery) {
    throw new HttpError(404, 'Could not create delivery method');
  }

  await delivery.save();
  res.status(200).json(delivery);
};
export const updateDelivery = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const deliveryMethod = await DeliveryModel.findById(id);

  if (!deliveryMethod) {
    throw new HttpError(404, 'Delivery option not found');
  }

  const updatedDeliveryMethod = await DeliveryModel.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  if (!updatedDeliveryMethod) {
    throw new HttpError(500, 'Delivery option could not be updated');
  }

  res.status(200).json({
    success: true,
    msg: 'Delivery option updated',
    data: updatedDeliveryMethod,
  });
};

export const deleteDelivery = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deliveryMethod = await DeliveryModel.findByIdAndDelete(id);

  if (!deliveryMethod) {
    throw new HttpError(404, 'Delivery method not found');
  }
  return res.status(200).json('Deleted delivery method');
};
