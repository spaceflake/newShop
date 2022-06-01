import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function FaqPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ bgcolor: "#ffffff", mt: 2, padding: 3, minHeight: "40vh" }}>
        <Typography
          sx={{ textAlign: "center", marginBottom: "1rem" }}
          variant="h4"
        >
          FAQ
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h1">
              What is the price for delivery?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1">
              Delivery with PostNord costs 19 kr, Schenker costs 29 kr, Instabox
              costs 29 kr.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h1">
              When do i get my order?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1">
              Delivery with PostNord takes 1-3 working days, trackable deliver
              with Schenker takes 1-2 working days, delivery to box with
              Instabox takes 1-2 working days.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h1">
              Which payment method can i choose?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1">
              Our payment options are Klarna (Installment, pay later or 30 days
              invoice.), Swish or pay with card, Visa, Maestro or MasterCard.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}

export default FaqPage;
