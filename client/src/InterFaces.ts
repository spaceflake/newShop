export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}
export interface Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  photo: string;
  categories: string[];
  stock: number;
}
