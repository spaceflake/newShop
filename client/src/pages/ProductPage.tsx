import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link, useParams } from 'react-router-dom'
import BuyButton from '../components/BuyButton'
import { ProductType, useProduct } from '../contexts/ProductsContext'
import { useCart } from '../contexts/CartContext'

function ProductPage() {
  let { id } = useParams()
  const { cart, dispatch } = useCart()
  const { products } = useProduct()
  const product = products.find(
    (item: ProductType) => item.id.toString() === id
  )

  return (
    <Container maxWidth="md">
      <Link to="/products">
        <Button startIcon={<ArrowBackIcon />}>
          Tillbaka till produktsidan
        </Button>
      </Link>
      {product && (
        <Card sx={{ height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'stretch',
              flexWrap: 'wrap',
            }}
          >
            <CardMedia
              component="img"
              height="480"
              image={product.imgURL}
              sx={{ objectFit: 'contain', maxWidth: '20rem' }}
            />
            <Box
              sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1', alignItems:"center" }}
            >
              <CardContent sx={{ flexGrow: '1' }}>
                <Typography variant="h5" component="div" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.information}
                </Typography>
                {/* <Rating name="read-only" value={ratingValue} readOnly /> */}
              </CardContent>
              <CardActions>
                {cart.some((p: any) => p.id === product.id) ? (
                  <Button>I kundkorgen</Button>
                ) : (
                  <BuyButton dispatch={dispatch} product={product} />
                )}
              </CardActions>
            </Box>
          </Box>
        </Card>
      )}
    </Container>
  )
}

export default ProductPage
