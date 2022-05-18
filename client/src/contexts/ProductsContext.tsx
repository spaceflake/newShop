import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockedProducts, Product } from '../Api/Data';
// import useLocalStorage from '../Hooks/useLocalStorage'
import { ProductActions, productReducer, ProductTypes } from './Reducers';

export interface ProductType extends Product {}

type PContext = {
  products: ProductType[];
  dispatch: React.Dispatch<ProductActions>;
  createProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
};

export const ProductContext = createContext<PContext>({} as PContext);

export const ProductsProvider: React.FC = ({ children }) => {
  const lsProducts = localStorage.getItem('products');
  const initialStateProducts =
    lsProducts !== null ? JSON.parse(lsProducts) : mockedProducts;

  let [products, dispatch] = useReducer<
    React.Reducer<ProductType[], ProductActions>
  >(productReducer, initialStateProducts);

  function createProduct(product: Product) {
    dispatch({
      type: ProductTypes.Create,
      payload: { product },
    });
  }

  function updateProduct(product: Product) {
    dispatch({
      type: ProductTypes.Update,
      payload: { product },
    });
  }

  function deleteProduct(id: number) {
    dispatch({
      type: ProductTypes.Delete,
      payload: { id },
    });
  }

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
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
