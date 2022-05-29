import React, { useEffect, useState } from 'react'
import { useProduct } from '../../contexts/ProductsContext';
import { FormikErrors, useFormik } from "formik";
import CloseIcon from '@mui/icons-material/Close';

import { Product } from '../../../../server/resources/product/product.model';
import { TextField } from '@mui/material';
import { useParams } from 'react-router-dom';


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

const EditProductForm = () => {
  let { id } = useParams();
  const { prods } = useProduct()
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    
    const getProduct = () => {
      const foundProduct = prods.find(prod => prod.id === id)

      if(foundProduct) {
        setProduct(foundProduct)

      }
  
      console.log(product);
      
    }

    getProduct()
  }, [prods, id, product]);


  // const formik = useFormik({
  //   initialValues: {
  //     id?: product?.id,
  //     title: product.title,
  //     price: product.price,
  //     description: product.description,
  //     photo: product.photo,
  //     categories: product.categories,
  //     stock: 0,
  //   },
  //   validate,
  //   onSubmit: (values) => {
  //     const editedProductData = {
  //       ...values,
  //     }
    
  //   }
  // });
  return (
    <form>
        <div >
          <h2 >Edit product</h2>
          <button ><CloseIcon style={{ fontSize: 32 }} /></button>
        </div>
        <div >
          <div >
            <div >
              <label htmlFor="name">Title</label>
              <TextField
                id="name"
                name="name"
                type="name"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.title}
              />
              {/* {formik.touched.title && formik.errors.title ? <div >{formik.errors.title}</div> : null} */}
            </div>

          

            <div >
              <label htmlFor="price">Price</label>
              <TextField
                id="price"
                name="price"
                type="price"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.price}
              />
              {/* {formik.touched.price && formik.errors.price ? <div >{formik.errors.price}</div> : null} */}
            </div>

            <div >
              <label htmlFor="image">Add Image</label>
              <TextField
                id="image"
                name="image"
                type="text"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.photo}
              />
              {/* {formik.touched.photo && formik.errors.photo ? <div >{formik.errors.photo}</div> : null} */}
            </div>

            <div >
              <label htmlFor="description">Description</label>
              <TextField
                
                id="description"
                name="description"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.description}
              />
              {/* {formik.touched.description && formik.errors.description ? <div >{formik.errors.description}</div> : null} */}
            </div>

            <div >
              <button type="submit">SAVE PRODUCT</button>
            </div>
          </div>
        </div>
      </form>
  )
}

export default EditProductForm