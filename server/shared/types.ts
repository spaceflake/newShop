import { Product as ServerProduct } from '../resources/product';
export type Product = Omit<ServerProduct, 'photoId'> & { photoId: string };

export { User } from '../resources/user';
export { Order, Address } from '../resources/order';
export { Delivery } from '../resources/delivery';
