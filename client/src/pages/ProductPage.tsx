import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useParams } from "react-router-dom";
import BuyButton from "../components/BuyButton";
import { useProduct } from "../contexts/ProductsContext";
import { useCart } from "../contexts/CartContext";

function ProductPage() {
  let { id } = useParams();
  const { cart, dispatch } = useCart();
  const { prods } = useProduct();
  const product = prods.find((item) => item.id?.toString() === id);

  return (
    <Container maxWidth="md">
      <Link to="/products">
        <Button sx={{
          mt: 2,
          mb: '1rem',
          height: "3rem",
          bgcolor: "#ED6C02",
          border: "none",
          color: " white",
          "&:hover": {
            bgcolor: '#181818',
            color: 'white',
          },
        }} startIcon={<ArrowBackIcon />}>Back to products</Button>
      </Link>
      {product && (
        <Card elevation={10} sx={{ height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "stretch",
              flexWrap: "wrap",
            }}
          >
            <CardMedia
              component="img"
              height="480"
              image={product.photoUrl}
              sx={{ objectFit: 'contain', maxWidth: '20rem' }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flexGrow: "1" }}>
                <Typography variant="h3" component="div" gutterBottom>
                  {product.title}
                </Typography>
                <Typography sx={{ fontSize: '1,5rem' }}>
                  {product.price} kr
                </Typography>
                <Typography sx={{ fontSize: '1,5rem' }}>
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions>
                {cart.some((p: any) => p.id === product.id) ? (
                  <Button sx={{ color: 'black' }}>In cart</Button>
                ) : (
                  <BuyButton dispatch={dispatch} product={product} />
                )}
              </CardActions>
            </Box>
          </Box>
        </Card>
      )}
    </Container>
  );
}

export default ProductPage;
