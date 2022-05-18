import { Grid } from '@mui/material';
import { useState } from 'react';
import { useProduct, ProductType } from '../../contexts/ProductsContext';
import ProductCard from './ProductCard';

function getRandomProducts(
  products: ProductType[],
  requestedNumberOfIndicies: number
) {
  const numberOfIndicies = Math.min(requestedNumberOfIndicies, products.length);
  let productsCopy = [...products];
  let randomProducts: ProductType[] = new Array<ProductType>(numberOfIndicies);

  for (let i = 0; i < numberOfIndicies; i++) {
    let index = Math.floor(Math.random() * productsCopy.length);
    randomProducts[i] = productsCopy[index];
    productsCopy.splice(index, 1);
  }

  return randomProducts;
}

function PopularDucks() {
  const { products } = useProduct();

  const [popularProducts] = useState(getRandomProducts(products, 3));

  return (
    <Grid
      container
      sx={{ gap: '1rem', alignItems: 'center', justifyContent: 'center' }}
    >
      {popularProducts &&
        popularProducts.map((product: ProductType) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </Grid>
  );
}

export default PopularDucks;
