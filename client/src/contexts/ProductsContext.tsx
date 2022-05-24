import axios from 'axios';
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
// import { mockedProducts } from '../Api/Data';
// import useLocalStorage from '../Hooks/useLocalStorage'
import { ProductActions, productReducer, ProductTypes } from './Reducers';
import { Product } from '../../../server/resources/product/product.model';
// import { Product } from '../InterFaces';

export interface ProductType extends Product {}

type PContext = {
  prods: Product[];
  products: Product[];
  categories: string[];
  dispatch: React.Dispatch<ProductActions>;
  createProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
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

  function createProduct(product: Product) {
    // TODO: add product to database
    dispatch({
      type: ProductTypes.Create,
      payload: { product },
    });
  }

  function updateProduct(product: Product) {
    // TODO: send PUT/PATCH to server, update database
    dispatch({
      type: ProductTypes.Update,
      payload: { product },
    });
  }

  function deleteProduct(id: number) {
    // TODO: Delete product from database
    dispatch({
      type: ProductTypes.Delete,
      payload: { id },
    });
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
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
