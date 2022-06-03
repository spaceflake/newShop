import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Drawer,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { FormikErrors, useFormik } from 'formik';
import React, { ChangeEvent, useState } from 'react';
import { Product } from '@shared/types';
import { useProduct } from '../../contexts/ProductsContext';
import { PhotoCamera } from '@mui/icons-material';
import axios, { AxiosResponse } from 'axios';

const validate = (values: Product) => {
  const errors: FormikErrors<Product> = {};
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

  return errors;
};

interface Props {
  product: Product;
}
const Input = styled('input')({
  display: 'none',
});


function ProductCard({ product }: Props) {
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const { updateProduct, deleteProduct, categories } = useProduct();
  const [imgSrc, setImgSrc] = useState<any>();
  // const [newCategories, setNewCategories] = useState<string[]>([]);
  const [categorySelect, setCategorySelect] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setCategorySelect(
      typeof value === 'string' ? value.split(',') : value,
    );
    formik.setFieldValue('categories',  [...categorySelect])
  };

  
  
  const handleEditDrawerOpen = () => {
    setOpenEditProduct(true);
  };
  const handleEditDrawerClose = () => {
    setOpenEditProduct(false);
  };
  const handleDeleteDrawerOpen = () => {
    setOpenDelete(true);
  };
  const handleDeleteDrawerClose = () => {
    setOpenDelete(false);
  };

  //    const id = Math.max(...products.map((p) => p.id)) + 1;
  let drawerWidth;
  if (!openEditProduct) {
    drawerWidth = '0%';
  } else {
    drawerWidth = '100%';
  }
  let drawerHeight;
  if (!openEditProduct) {
    drawerHeight = '0%';
  } else {
    drawerHeight = '100%';
  }
  const formik = useFormik<Product>({
    initialValues: product,
    validate,
    onSubmit: (values) => {
      const updatedProduct = {
        ...values,
      };
      updateProduct({
        ...updatedProduct,
      });
    },
  });

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
    <Card key={product.id} sx={{ borderRadius: '1rem', padding: '1rem' }}>
      <CardActionArea>
        <CardContent sx={{ padding: '0' }}>
          <CardMedia
            component="img"
            height="240"
            image={product.photoUrl}
            sx={{ objectFit: 'contain', objectPosition: 'center top' }}
          />
          <Box
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap-reverse',
              alignItems: 'center',
              marginBlock: '1rem',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h5"
              component="span"
              color="primary"
              fontWeight="700"
              sx={{ marginRight: '.4rem' }}
            >
              {product?.title}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          justifyContent: 'space-between',
          padding: '0',
        }}
      >
        <Button
          sx={{
            mt: 2,
            mb: 2,
            height: '3rem',
            bgcolor: '#ffffff',
            border: '1',
            borderColor: '#c6c6c6',
            color: ' black',
            '&:hover': {
              bgcolor: '#c6c6c6',
              borderColor: '#c6c6c6',
            },
          }}
          onClick={() => {
            handleEditDrawerOpen();
          }}
          variant="outlined"
        >
          Edit
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
          open={openEditProduct}
        >
          <DrawerHeader
            sx={{
              margin: '1rem',
            }}
          >
            <IconButton onClick={handleEditDrawerClose}>
              <CloseIcon style={{ fontSize: 32 }} />
            </IconButton>
            <Typography>Edit Product</Typography>
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
                    <img src={product.photoUrl} alt="" />
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
                  {product.stock <= 2 ? (
                    <p>This product almost finished</p>
                  ) : null}
                  {formik.touched.stock && formik.errors.stock ? (
                    <div>{formik.errors.stock}</div>
                  ) : null}
                </Box>
                <label htmlFor="categories">Add new category</label>
                  <TextField
                    id="category"
                    name="category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // value={formik.values.category}
                  />
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
        <Button
          onClick={handleDeleteDrawerOpen}
          sx={{
            mt: 2,
            mb: 2,
            height: '3rem',
            bgcolor: '#ffffff',
            border: '1',
            borderColor: '#c6c6c6',
            color: ' black',
            '&:hover': {
              bgcolor: '#c6c6c6',
              borderColor: '#c6c6c6',
            },
          }}
          variant="outlined"
        >
          Delete
        </Button>
        <Drawer
          sx={{
            position: 'absolute',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              marginTop: '10rem',
              marginRight: { sm: '8rem', lg: '20rem' },
              width: { xs: '50%', sm: '50%', md: '50%', lg: '50%' },
              height: { xs: '60%', sm: '50%', md: '50%', lg: '50%' },
              backgroundColor: '#ECECEC',
              borderRadius: '20px',
            },
          }}
          variant="persistent"
          anchor="right"
          open={openDelete}
        >
          <DrawerHeader>
            <IconButton onClick={handleDeleteDrawerClose}>
              <CloseIcon />
            </IconButton>
            <Typography>Are you sure you want to delete this post?</Typography>
          </DrawerHeader>
          <Button
            type="button"
            onClick={() => {
              handleDeleteDrawerClose();
            }}
          >
            No
          </Button>
          <Button
            type="button"
            onClick={() => {
              deleteProduct(product.id);
              handleDeleteDrawerClose();
              console.log(product.id);
            }}
          >
            Yes
          </Button>
        </Drawer>
      </CardActions>
    </Card>
  );
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'flex-start',
}));

export default ProductCard;
