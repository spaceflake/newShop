import type { Product } from '@shared/types';
import axios, { AxiosResponse } from 'axios';
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { ProductActions, productReducer } from './Reducers';

export type ProductCreate = Omit<Product, 'id' | 'photoUrl'>;

type PContext = {
  prods: Product[];
  categories: string[];
  dispatch: React.Dispatch<ProductActions>;
  getAllProducts: () => void;
  createProduct: (product: ProductCreate) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
};

export const ProductContext = createContext<PContext>({} as PContext);

export const ProductsProvider: React.FC = ({ children }) => {
  let initialStateProducts: Product[] = [];
  const [prods, setProds] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get<string[]>('/api/product/categories');
      const result = await res.data;

      setCategories(['All', ...result]);
    };

    getCategories();
  }, []);

  let [products, dispatch] = useReducer<
    React.Reducer<Product[], ProductActions>
  >(productReducer, initialStateProducts);

  const getAllProducts = async () => {
    const response = await axios.get('/api/product');
    const res: Product[] = await response.data;
    if (res) {
      setProds(res);
    }
  };

  const createProduct = async (product: ProductCreate) => {
    await axios
      .post('/api/product/', {
        ...product,
      })
      .then(
        (res: AxiosResponse) => {
          console.log('suc');
        },
        () => {
          console.log('Failure');
        }
      );
  };

  const updateProduct = async (product: Product) => {
    await axios
      .put('/api/product/' + product.id, {
        ...product,
      })
      .then(
        (res: AxiosResponse) => {
          console.log('suc');
        },
        () => {
          console.log('Failure');
        }
      );
  };

  const deleteProduct = async (productId: string) => {
    await axios.delete('/api/product/' + productId).then(
      (res: AxiosResponse) => {
        console.log('suc');
      },
      () => {
        console.log('Failure');
      }
    );
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        prods,
        categories,
        dispatch,
        getAllProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export default ProductsProvider;
// useProduct hook
export const useProduct = () => useContext(ProductContext);
