import { PhotoCamera } from '@mui/icons-material';
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
  Input,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Product } from '@shared/types';
import axios from 'axios';
import { FormikErrors, useFormik } from 'formik';
import { ChangeEvent } from 'react';
import * as Yup from 'yup'
import { ProductCreate } from '../../contexts/ProductsContext';
import { useProduct } from '../../contexts/ProductsContext';



type ProductDetailsSchemaType = Record<keyof ProductCreate, Yup.AnySchema>;
// const ProductFormSchema = Yup.object().shape<ProductDetailsSchemaType>({
//   title: Yup.string().required("Please enter your email."),
//   description: Yup.string().required("Please enter your password."),
//   //photo: Yup.string().required("Please enter"),
//   categories:  Yup.string().required("Please enter"),
//   price: Yup.string().required("Please enter"),
//   stock: Yup.string().required("Please enter"),
//   //qty: Yup.string().required("Please enter"),
//   photoId: Yup.string().required("Please enter"),
// });



interface Props {
  product: Product;
}


function ProductForm({ product } : Props) {
  const { createProduct, updateProduct, deleteProduct, categories } = useProduct();

  const formik = useFormik<Product>({
    initialValues: product,
    // validationSchema: ProductFormSchema,
    onSubmit: (values) => {
      const updatedProduct = {
        ...values,
      };
      updateProduct({
        ...updatedProduct,
      });
    },
  });

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.set('media', file);
    console.log(file);


    await axios.post('/api/media/', formData)
      .then(
        res => {
          formik.setFieldValue('photoId',  res.data._id)  
        })
    
  };
  return ( 
    <>
    <form onSubmit={formik.handleSubmit}>
            <div>
              <div>
                <div>
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
                    <div>{formik.errors.title}</div>
                  ) : null}
                </div>

                <div>
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
                    <div>{formik.errors.price}</div>
                  ) : null}
                </div>

                <div>
        
                <input  type="file" onChange={uploadImage}/>
                <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
                </IconButton>
                </div>

                <div>
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
                    <div>{formik.errors.description}</div>
                  ) : null}
                </div>                <div>
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
                </div>
                <ButtonGroup>
                    {categories.map((categori) => (
                      <Button
                        key={categori}
                        variant={
                          product.categories.includes(categori)
                            ? 'contained'
                            : 'outlined'
                        }
                      >
                        {categori}
                      </Button>
                    ))}
                  </ButtonGroup>
                <div>
                  <button type="submit">SAVE</button>
                </div>
              </div>
            </div>
          </form></>
   );
}

export default ProductForm;