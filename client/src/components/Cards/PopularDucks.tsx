import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import type { Product } from '@shared/types';
import { useProduct } from '../../contexts/ProductsContext';
import ProductCard from './ProductCard';

function PopularDucks() {
  const { prods } = useProduct();
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  useEffect(() => {
    function getRandomProducts(
      products: Product[],
      requestedNumberOfIndicies: number
    ) {
      const numberOfIndicies = Math.min(
        requestedNumberOfIndicies,
        products.length
      );
      let productsCopy = [...products];
      let randomProducts: Product[] = new Array<Product>(numberOfIndicies);

      for (let i = 0; i < numberOfIndicies; i++) {
        let index = Math.floor(Math.random() * productsCopy.length);
        randomProducts[i] = productsCopy[index];
        productsCopy.splice(index, 1);
      }

      return randomProducts;
    }
    setPopularProducts(getRandomProducts(prods, 3));
  }, [prods]);

  return (
    <Grid
      container
      sx={{ gap: '1rem', alignItems: 'center', justifyContent: 'center' }}
    >
      {popularProducts &&
        popularProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </Grid>
  );
}

export default PopularDucks;
