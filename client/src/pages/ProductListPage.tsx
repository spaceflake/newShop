import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Categories, MockedCategories } from '../Api/Data';
import ProductCard from '../components/Cards/ProductCard';
import { useProduct, ProductType } from '../contexts/ProductsContext';

interface CategoryState {
  [key: string]: any;
}

function createCategoryState(categoryParam: string | null) {
  const categoryParamValues =
    categoryParam === null ? [] : categoryParam.split(',');

  const categories = Categories.filter(
    (a) =>
      categoryParamValues.findIndex(
        (b) => a.toLowerCase() === b.toLowerCase()
      ) >= 0
  );

  const categoryState: CategoryState = {
    all: categories.length === 0,
  };

  Categories.map(
    (category) => (categoryState[category] = categories.includes(category))
  );

  return categoryState;
}

function handleCategoryAllClick(setCategoryState: (arg0: any) => void) {
  const newState: CategoryState = {
    all: true,
  };

  Categories.map((category) => (newState[category] = false));

  setCategoryState(newState);
}

function handleCategoryClick(
  categoryState: CategoryState,
  setCategoryState: (arg0: any) => void,
  category: MockedCategories
) {
  const newCategoryState = {
    ...categoryState,
    [category]: !categoryState[category],
  };

  setCategoryState({
    ...newCategoryState,
    all: !Object.values(newCategoryState).some((x: boolean) => x),
  });
}

function ProductListPage() {
  const { products } = useProduct();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [categoryState, setCategoryState] = useState(
    createCategoryState(categoryParam)
  );

  const matches = useMediaQuery('(max-width: 440px)');

  const filteredCategories = categoryState.all
    ? Categories
    : Categories.filter((category) => categoryState[category]);

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
          <Button
            variant={categoryState.all ? 'contained' : 'outlined'}
            onClick={() => handleCategoryAllClick(setCategoryState)}
          >
            Alla
          </Button>
          {Categories.map((category, index) => (
            <Button
              key={index}
              variant={categoryState[category] ? 'contained' : 'outlined'}
              onClick={() =>
                handleCategoryClick(categoryState, setCategoryState, category)
              }
            >
              {category}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <Grid container spacing={2}>
        {products
          .filter((product) =>
            filteredCategories.includes(product.category as MockedCategories)
          )
          .map((product: ProductType) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <ProductCard key={product.id} product={product} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default ProductListPage;
