import axios, { AxiosResponse } from 'axios';
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
  categories: string[];
  dispatch: React.Dispatch<ProductActions>;
  createProduct: (product: Product) => void;
  updateProduct: (productId: string, product: Product) => void;
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
    const newProduct = {
      title: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      photo: { type: String, required: true },
      categories: { type: [String], required: true },
      stock: { type: Number, required: true },
    }
    dispatch({
      type: ProductTypes.Create,
      payload: { product },
    });
  }

  async function  updateProduct(productId: string, product: Product) {
    await axios.put("http://localhost:4000/api/product/" + productId, {
      ...product
      }, {
        withCredentials: true
      }).then((res: AxiosResponse) => {
          // window.location.reload();
          console.log('suc');
      }, () => {
        console.log("Failure");
      })
      console.log(productId);
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
