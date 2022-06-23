import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Slide,
  styled,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { TransitionProps } from '@mui/material/transitions';
import { Product } from '@shared/types';
import axios from 'axios';
import { FormikErrors, useFormik } from 'formik';
import React, { ChangeEvent, useState } from 'react';
import { useProduct } from '../../contexts/ProductsContext';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const validate = (values: Product) => {
  const errors: FormikErrors<Product> = {};
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

  return errors;
};

interface Props {
  product: Product;
}
const Input = styled('input')({
  display: 'none',
});

function ProductCard({ product }: Props) {
  const { updateProduct, deleteProduct, categories } = useProduct();
  const [imgSrc, setImgSrc] = useState<any>();
  const [categorySelect, setCategorySelect] = React.useState<string[]>([]);
  const [openEditProduct, setOpenEditProduct] = React.useState(false);
  const [openDeleteProduct, setOpenDeleteProduct] = React.useState(false);

  function handleClickOpen(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (e.currentTarget.innerText === 'EDIT') {
      setOpenEditProduct(true);
    } else {
      setOpenDeleteProduct(true);
    }
  }

  function handleClose() {
    setOpenEditProduct(false);
    setOpenDeleteProduct(false);
  }

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setCategorySelect(typeof value === 'string' ? value.split(',') : value);
    formik.setFieldValue('categories', [...categorySelect]);
  };

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
      handleClose();
    },
  });

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
    <Card
      elevation={3}
      key={product.id}
      sx={{ borderRadius: '1rem', padding: '1rem' }}
    >
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
          onClick={(e) => {
            handleClickOpen(e);
          }}
          variant="outlined"
        >
          Edit
        </Button>

        <Dialog
          fullScreen
          open={openEditProduct}
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
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Edit product
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
            {product.stock <= 3 && product.stock > 0 ? (
              <Typography color="red">
                This product is almost sold out
              </Typography>
            ) : null}
            {product.stock <= 0 ? (
              <Typography color="red">
                This product is sold out
              </Typography>
            ) : null}
            {formik.touched.stock && formik.errors.stock ? (
              <div>{formik.errors.stock}</div>
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
              <img style={{ width: '350px' }} src={product.photoUrl} alt="" />
              <label htmlFor="contained-button-file">
                <Input
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

        <Button
          onClick={(e) => handleClickOpen(e)}
          sx={{
            mt: 2,
            mb: 2,
            height: '3rem',
            bgcolor: 'red',
            border: '1',
            borderColor: '#c6c6c6',
            color: 'white',
            '&:hover': {
              bgcolor: 'black',
              borderColor: '#c6c6c6',
            },
          }}
          variant="outlined"
        >
          <DeleteForeverIcon />
        </Button>
        <Dialog
          open={openDeleteProduct}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Delete product'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you wish to delete the "{formik.values.title}"
              product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                deleteProduct(product.id);
                console.log(product.id);
                handleClose();
                window.location.reload();
              }}
            >
              Yes
            </Button>
            <Button onClick={handleClose} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
