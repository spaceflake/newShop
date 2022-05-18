import { Box, Button, Container, List } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Link } from 'react-router-dom';
import { Product } from '../Api/Data';
import { useProduct } from '../contexts/ProductsContext';
import AdminPageAccordion from '../components/AdminPageAccordion';
import { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

function AdminPage() {
  const { products, createProduct, updateProduct, deleteProduct } =
    useProduct();
  const [addingProduct, setAddingProduct] = useState(false);

  const newProduct = () => {
    const id = Math.max(...products.map((p) => p.id)) + 1;

    const product: Product = {
      title: '',
      information: '',
      id,
      category: '',
      price: 0,
      imgURL: '',
    };

    return product;
  };

  const createNewProduct = (product: Product) => {
    setAddingProduct(false);
    createProduct(product);
  };

  const deleteNewProduct = () => setAddingProduct(false);

  return (
    <Container maxWidth="xl" sx={{ height: '100%' }}>
      <Link to="/">
        <Button startIcon={<ArrowBackIcon />}>Tillbaka till startsidan</Button>
      </Link>
      <Box
        sx={{
          height: '100%',
        }}
      >
        <List>
          {products.map((p, i) => {
            return (
              <AdminPageAccordion
                key={i}
                product={p}
                saveAction={updateProduct}
                deleteAction={deleteProduct}
              />
            );
          })}
          {addingProduct && (
            <AdminPageAccordion
              key="new"
              expanded={true}
              product={newProduct()}
              saveAction={createNewProduct}
              deleteAction={deleteNewProduct}
            />
          )}
        </List>
        {!addingProduct && (
          <Button
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={() => setAddingProduct(true)}
          >
            Lägg till ny produkt
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default AdminPage;
