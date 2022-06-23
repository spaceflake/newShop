import { Grid } from '@mui/material';
import AdminEditProductCard from '../../components/Cards/AdminEditProductCard';
import { useProduct } from '../../contexts/ProductsContext';

const AdminProductEdit = () => {
  const { prods } = useProduct();
  return (
    <>
      <Grid container spacing={2}>
        {prods.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <AdminEditProductCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AdminProductEdit;
