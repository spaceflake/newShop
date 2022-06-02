import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Container,
  Drawer,
  FormLabel,
  IconButton,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { display, padding } from '@mui/system';
import { FormikErrors, useFormik } from 'formik';
import { useState } from 'react';
import { useProduct, ProductCreate } from '../../contexts/ProductsContext';
import AdminEditProduct from './AdminEditProduct';

const validate = (values: ProductCreate) => {
  const errors: FormikErrors<ProductCreate> = {};
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length > 15 || values.title.length < 2) {
    errors.title = 'Must be between 2 and 15 characters';
  }

  // if (!values.categories) {
  //   errors.categories = 'Required';
  // } else if (values.brand.length > 15 || values.brand.length < 2) {
  //   errors.brand = 'Must be between 2 and 15 characters';
  // }

  if (!values.price) {
    errors.price = 'Required';
  }

  if (!values.description) {
    errors.description = 'Required';
  }

  if (!values.photo) {
    errors.photo = 'Required';
  }
  // if (!values.stock) {
  //   errors.stock = 'Required';
  // }

  return errors;
};
const AdminProductControl = () => {
  const { createProduct } = useProduct();
  const [openAddProduct, setOpenAddProduct] = useState(false);

  const handleAddDrawerOpen = () => {
    setOpenAddProduct(true);
  };
  const handleAddDrawerClose = () => {
    setOpenAddProduct(false);
  };

  let drawerWidth;
  if (!openAddProduct) {
    drawerWidth = '0%';
  } else {
    drawerWidth = '100%';
  }
  let drawerHeight;
  if (!openAddProduct) {
    drawerHeight = '0%';
  } else {
    drawerHeight = '100%';
  }
  const formik = useFormik<ProductCreate>({
    initialValues: {
      title: '',
      price: 0,
      description: '',
      categories: [''],
      stock: 0,
      qty: 0,
      photoId: '',
      photo: '',
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      createProduct(values);
      window.location.reload();
    },
  });

  return (
    <Container maxWidth="xl" sx={{ height: '100%' }}>
      <Box
        sx={{
          height: '100%',
        }}
      >
        <Box>
          <Button
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={handleAddDrawerOpen}
          >
            Add a new product
          </Button>
          <Drawer
            sx={{
              position: 'absolute',
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                marginTop: '3rem',
                marginRight: { sm: '8rem', lg: '20rem' },
                width: { xs: '100%', sm: '50%', md: '80%', lg: '80%' },
                height: { xs: '60%', sm: '50%', md: '90%', lg: '90%' },
                backgroundColor: '#ECECEC',
                borderRadius: '20px',
              },
            }}
            variant="persistent"
            anchor="right"
            open={openAddProduct}
          >
            <DrawerHeader
              sx={{
                margin: '1rem',
              }}
            >
              <IconButton onClick={handleAddDrawerClose}>
                <CloseIcon style={{ fontSize: 32 }} />
              </IconButton>
              <Typography>Add Product</Typography>
            </DrawerHeader>
              <AddForm>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div>
                  <div>
                    <label htmlFor="name">Title</label>  
                    <TextField
                     sx={{display: 'flex', justifyContent: 'center', padding: '1rem'}}
                      id="title"
                      name="title"
                      type="title"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <div>{formik.errors.title}</div>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="price">Price</label>
                    <TextField
                    sx={{display: 'flex', justifyContent: 'center', padding: '1rem'}}
                      id="price"
                      name="price"
                      type="price"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.price}
                    />
                    {formik.touched.price && formik.errors.price ? (
                      <div>{formik.errors.price}</div>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="photo">Add Image</label>
                    <TextField
                     sx={{display: 'flex', justifyContent: 'center', padding: '1rem'}}
                      id="photo"
                      name="photo"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.photo}
                    />
                    {/* {formik.touched.photo && formik.errors.photo ? <div >{formik.errors.photo}</div> : null} */}
                  </div>

                  <div>
                    <label htmlFor="description">Description</label>
                    <TextField
                  sx={{display: 'flex', justifyContent: 'center', padding: '1rem'}}
                      id="description"
                      name="description"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                    />
                    {formik.touched.description && formik.errors.description ? (
                      <div>{formik.errors.description}</div>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="description">Stock</label>
                    <TextField
                  sx={{display: 'flex', justifyContent: 'center', padding: '1rem'}}
                      id="Stock"
                      name="Stock"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.stock}
                    />
                    {/* {product.stock <= 2 ? <p>This prosduct almost finished</p> : null} */}
                    {formik.touched.stock && formik.errors.stock ? (
                      <div>{formik.errors.stock}</div>
                    ) : null}
                  </div>

                  <div>
                    <button type="submit">SAVE</button>
                  </div>
                </div>
              </div>
            </form>
            </AddForm>
          </Drawer>
        </Box>
        <AdminEditProduct />
      </Box>
    </Container>
  );
};

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'flex-start',
  
}));

const AddForm = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  justifyContent: 'flex-start',
  
  
}));




export default AdminProductControl;
