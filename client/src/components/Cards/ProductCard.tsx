import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Rating,
  CardActions,
  Button,
  CardActionArea,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import BuyButton from '../BuyButton'
import { CartType } from '../../contexts/Reducers'

function ProductCard({ product }: any) {
  const { cart, dispatch } = useCart()
  const [ratingValue] = useState(5)

  return (
    <Card key={product.id} sx={{ borderRadius: '1rem', padding: '1rem'}}>
      <CardActionArea>
        <Link to={`/products/${product.id}`}>
          <CardContent sx={{ padding: '0' }}>
            <CardMedia
              component="img"
              height="240"
              image={product.imgURL}
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
                flexDirection:"column"
              }}
            >
              <Typography
                variant="h5"
                component="span"
                color="primary"
                fontWeight="700"
                sx={{ marginRight: '.4rem' }}
              >
                {product.title}
              </Typography>
              <Box component="span">
                <Rating name="read-only" value={ratingValue} readOnly />
              </Box>
            </Box>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions
        sx={{
          justifyContent: 'space-between',
          padding: '0',
        }}
      >
        <Link to={`/products/${product.id}`}>
          <Button sx={{
              mt: 2,
              mb: 2,
              height: "3rem",
              bgcolor: "#ffffff",
              border: "1",
              borderColor:"#c6c6c6",
              color: " black",
              "&:hover": {
                bgcolor: "#c6c6c6",
                borderColor:"#c6c6c6",
              },
            }}variant="outlined">Visa</Button>
        </Link>
        {cart && cart.some((p: CartType) => p.id === product.id) ? (
          <Button>I kundkorgen</Button>
        ) : (
          <BuyButton dispatch={dispatch} product={product} />
        )}
      </CardActions>
    </Card>
  )
}

export default ProductCard
