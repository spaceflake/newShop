import React, { Fragment } from 'react'
import { useProduct } from '../../contexts/ProductsContext';
import ProductAdminCard from '../../components/Cards/ProductAdminCard';
import { Grid } from '@mui/material';

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