import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  Input,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import axios from 'axios';
import { FormikErrors, useFormik } from 'formik';
import React, { ChangeEvent, useState } from 'react';
import { ProductCreate, useProduct } from '../../contexts/ProductsContext';
import AdminEditProduct from './AdminEditProduct';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
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

  if (!values.stock) {
    errors.stock = 'Required';
  }

  return errors;
};

const AdminProductControl = () => {
  const { createProduct, categories } = useProduct();
  const [imgSrc, setImgSrc] = useState<any>();
  const [open, setOpen] = React.useState(false);
  const [categorySelect, setCategorySelect] = useState<string[]>([]);

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
      const newProduct = { ...values };
      console.log(values);
      createProduct({ ...newProduct });
      window.location.reload();
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setCategorySelect(typeof value === 'string' ? value.split(',') : value);
    formik.setFieldValue('categories', [...categorySelect]);
  };

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.set('media', file);
    console.log(file);

    axios.post('/api/media/', formData).then((res) => {
      formik.setFieldValue('photoId', res.data._id);
    });

    let reader = new FileReader();
    reader.onloadend = () => {
      setImgSrc(reader.result);
    };
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
            onClick={handleClickOpen}
          >
            Add a new product
          </Button>

          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Create product
                </Typography>
              </Toolbar>
            </AppBar>

            <form
              style={{
                padding: '3rem 0rem',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                width: 'max-content',
                maxWidth: '95%',
                margin: '0 auto',
                gap: '1rem',
              }}
              onSubmit={formik.handleSubmit}
            >
              <TextField
                id="title"
                name="title"
                type="title"
                label="Title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <Box>{formik.errors.title}</Box>
              ) : null}
              <TextField
                id="price"
                name="price"
                type="price"
                label="Price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price ? (
                <Box>{formik.errors.price}</Box>
              ) : null}

              <TextField
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description ? (
                <Box>{formik.errors.description}</Box>
              ) : null}

              <TextField
                id="stock"
                name="stock"
                label="Stock"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock}
              />

              {formik.touched.stock && formik.errors.stock ? (
                <Typography>{formik.errors.stock}</Typography>
              ) : null}

              <Box>
                {/* <Typography>Current categories: {formik.values.categories}</Typography> */}
                <TextField
                  id="category"
                  name="category"
                  label="Add category"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Select
                  labelId="categories-select-label"
                  id="categories-select"
                  multiple
                  value={categorySelect as any}
                  onChange={handleChange}
                  input={<OutlinedInput label="Categories" />}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <Paper
                elevation={5}
                sx={{
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img style={{ width: '350px' }} src={imgSrc} alt="" />
                <label htmlFor="contained-button-file">
                  <Input
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    type="file"
                    onChange={uploadImage}
                  />
                  <Button variant="outlined" component="span">
                    Upload image
                  </Button>
                </label>
              </Paper>

              <Button variant="contained" type="submit">
                SAVE
              </Button>
            </form>
          </Dialog>
        </Box>
        <AdminEditProduct />
      </Box>
    </Container>
  );
};

export default AdminProductControl;
