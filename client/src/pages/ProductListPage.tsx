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
import { Product } from '../InterFaces';

function ProductListPage() {
  const { prods, categories } = useProduct();
  // const [categories, setCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  console.log(selectedCategory);

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
      console.log(category);
    },
    [prods, selectedCategory, setSearchParams]
  );

  useEffect(() => {
    filterCategories();
  }, [prods, filterCategories]);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '1rem',
        }}
      >
        <Typography gutterBottom variant="h6">
          Kategorier
        </Typography>
        <ButtonGroup
          orientation={matches ? 'vertical' : 'horizontal'}
          aria-label="button group"
        >
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="contained"
              onClick={() => filterCategories(category)}
            >
              {category}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
            <ProductCard key={product._id} product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductListPage;
