import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/Cards/ProductCard';
import { useProduct } from '../contexts/ProductsContext';
import type { Product } from '@shared/types';

function ProductListPage() {
  const { prods, categories, getAllProducts } = useProduct();
  // const [categories, setCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const matches = useMediaQuery('(max-width: 440px)');

  const filterCategories = useCallback(
    (category: string = selectedCategory || 'All') => {
      if (category === 'All') {
        setSearchParams({});
        setFilteredProducts(prods);
        return;
      }

      const prodFilter = prods.filter((prod) => {
        return prod.categories.some((cat) => cat === category);
      });

      setSearchParams({ category });
      setFilteredProducts(prodFilter);
    },
    [prods, selectedCategory, setSearchParams]
  );

  useEffect(() => {
    filterCategories();
  }, [prods, filterCategories]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts, prods]);

  return (
    <>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '1rem',
          }}
        >
          <Typography gutterBottom variant="h6">
            Categories
          </Typography>
          <ButtonGroup
            orientation={matches ? 'vertical' : 'horizontal'}
            aria-label="button group"
          >
            {categories.map((category, index) => (
              <Button
                sx={{
                  margin: '1rem 0.3rem',
                  height: '3rem',
                  bgcolor: '#ED6C02',
                  border: 'none',
                  color: ' white',
                  '&:hover': {
                    bgcolor: '#181818',
                    color: 'white',
                  },
                }}
                key={index}
                variant={
                  selectedCategory === category ? 'contained' : 'outlined'
                }
                onClick={() => filterCategories(category)}
              >
                {category}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
        <Grid
          container
          sx={{ gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default ProductListPage;
