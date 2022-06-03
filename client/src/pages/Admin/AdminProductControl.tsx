import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { FormikErrors, useFormik } from 'formik';
import { ChangeEvent, useState } from 'react';
import { useProduct, ProductCreate } from '../../contexts/ProductsContext';

import AdminEditProduct from './AdminEditProduct';

const Input = styled('input')({
  display: 'none',
});


const validate = (values: ProductCreate) => {
  const errors: FormikErrors<ProductCreate> = {};
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length > 15 || values.title.length < 2) {
    errors.title = 'Must be between 2 and 15 characters';
  }

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
  const { createProduct, categories } = useProduct();
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [imgSrc, setImgSrc] = useState<any>();
  const [categorySelect, setCategorySelect] = useState<string[]>([]);

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
      const newProduct = { ...values}
      console.log(values);
      createProduct({...newProduct});
      window.location.reload();
    },
  });
  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setCategorySelect(
      typeof value === 'string' ? value.split(',') : value,
    );
    formik.setFieldValue('categories',  [...categorySelect])
  };
  const uploadImage =  (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.set('media', file);
    console.log(file);
   
    
    axios.post('/api/media/', formData)
      .then(
        res => {
          formik.setFieldValue('photoId',  res.data._id)  
        })
  
        let reader = new FileReader();
        reader.onloadend = () => {
          setImgSrc(reader.result)
        }
        
    
  };
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
            <form onSubmit={formik.handleSubmit}>
            <Box>
              <Box>
                <Box>
                  <label htmlFor="name">Title</label>
                  <TextField
                    id="title"
                    name="title"
                    type="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <Box>{formik.errors.title}</Box>
                  ) : null}
                </Box>

                <Box>
                  <label htmlFor="price">Price</label>
                  <TextField
                    id="price"
                    name="price"
                    type="price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                  />
                  {formik.touched.price && formik.errors.price ? (
                    <Box>{formik.errors.price}</Box>
                  ) : null}
                </Box>

                <Box>
        
                {/* <input type="file" onChange={uploadImage}/> */}
                    <img src={imgSrc} alt="" />
                <Box>
                </Box>
                <label htmlFor="contained-button-file">
                <Input id="contained-button-file"  type="file" onChange={uploadImage} />
                <Button variant="contained" component="span">
                  Upload
                </Button>
                  </label>
                </Box>

                <Box>
                  <label htmlFor="description">Description
               
                  </label>
                  <TextField
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <Box>{formik.errors.description}</Box>
                  ) : null}
                </Box>                
                <Box>
                  <label htmlFor="description">Stock</label>
                  <TextField
                    id="stock"
                    name="stock"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.stock}
                  />
                  {formik.touched.stock && formik.errors.stock ? (
                    <div>{formik.errors.stock}</div>
                  ) : null}
                </Box>
                {/* <label htmlFor="categories">Add new category</label>
                  <TextField
                    id="category"
                    name="category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // value={formik.values.category}
                  /> */}
                {/* <ButtonGroup>
                    {categories.map((categori) => (
                      <Button
                        key={categori}
                        onClick={() => {
                          setNewCategories([categori])
                          formik.setFieldValue('categories',  newCategories)
                          console.log(categori);
                          
                        }}
                        variant={
                          product.categories.includes(categori)
                            ? 'contained'
                            : 'outlined'
                        }
                      >
                        {categori}
                      </Button>
                    ))}
                  </ButtonGroup> */}
                  <InputLabel id='categories-select-label'>Choose categories</InputLabel>
                  <Select labelId="categories-select-label" id="categories-select" multiple value={categorySelect as any} onChange={handleChange} input={<OutlinedInput label="Categories"/>}>
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                <Box>
                  <Button type="submit">SAVE</Button>
                </Box>
              </Box>
            </Box>
          </form>
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
