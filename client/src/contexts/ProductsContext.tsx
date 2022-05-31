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
  createProduct: (product: ProductCreate) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
};

export const ProductContext = createContext<PContext>({} as PContext);

export const ProductsProvider: React.FC = ({ children }) => {
  // const lsProducts = localStorage.getItem('products');
  let initialStateProducts: Product[] = [];
  // lsProducts !== null ? JSON.parse(lsProducts) : mockedProducts;
  const [prods, setProds] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get<string[]>(
        'http://localhost:4000/api/product/categories'
      );
      const result = await res.data;

      setCategories(['All', ...result]);
    };

    getCategories();
  }, []);

  let [products, dispatch] = useReducer<
    React.Reducer<Product[], ProductActions>
  >(productReducer, initialStateProducts);

  const getAllProducts = async () => {
    const response = await axios.get('http://localhost:4000/api/product');
    const res: Product[] = await response.data;
    if (res) {
      setProds(res);
    }
  };

  console.log(prods);

  const createProduct = async (product: ProductCreate) => {
    // TODO: add product to database
    await axios
      .post('http://localhost:4000/api/product/', {
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
      .put(
        'http://localhost:4000/api/product/' + product.id,
        {
          ...product,
        },
        {
          withCredentials: true,
        }
      )
      .then(
        (res: AxiosResponse) => {
          console.log('suc');
        },
        () => {
          console.log('Failure');
        }
      );
    console.log(product.id);
    console.log();
  };

  const deleteProduct = async (productId: string) => {
    await axios.delete('http://localhost:4000/api/product/' + productId).then(
      (res: AxiosResponse) => {
        console.log('suc');
        console.log(productId);
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
