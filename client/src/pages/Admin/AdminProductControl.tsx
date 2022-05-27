import { Box, Button, Container, List } from '@mui/material';
import { Product } from '../../../../server/resources/product/product.model';
import { useProduct } from '../../contexts/ProductsContext';
import AdminPageAccordion from '../../components/AdminPageAccordion';
import { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import axios, { AxiosResponse } from 'axios';

const AdminProductControl = () => {
  const { prods, createProduct, updateProduct, deleteProduct } =
  useProduct();
const [addingProduct, setAddingProduct] = useState(false);
// console.log(prods);

const newProduct = () => {
//    const id = Math.max(...products.map((p) => p.id)) + 1;

const product: Product = {
  _id: '',
  title: '',
  description: '',
  categories: [],
  price: 0,
  photo: '',
  stock: 0,
};

  return product;
};

const createNewProduct = async (product: Product) => {
  setAddingProduct(false);
  createProduct(product);
  await axios.post("http://localhost:4000/api/product/", 
  {

  }
  ).then((res: AxiosResponse) => {
      // window.location.href = "/"
      console.log('suc');
    }, () => {
      console.log("Failure");
    })
};

const deleteNewProduct = () => setAddingProduct(false);

return (
  <Container maxWidth="xl" sx={{ height: '100%' }}>
  
    <Box
      sx={{
        height: '100%',
      }}
    >
   
      <List>
        {prods.map((p, i) => {
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
          Add a new product
        </Button>
      )}
    </Box>
  </Container>
);
}

export default AdminProductControl