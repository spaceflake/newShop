import { Grid } from '@mui/material';
import React from 'react';
import ProductAdminCard from '../../components/Cards/AdminEditProductCard';
import { useProduct } from '../../contexts/ProductsContext';

const AdminProductEdit = () => {
  const { prods } = useProduct()
  return (
  <>
      <Grid container spacing={2}>
        {prods.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <ProductAdminCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
  </>
  )
}

export default AdminProductEdit