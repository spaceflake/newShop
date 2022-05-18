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
      <Box sx={{ bgcolor: "#ffffff", mt: 2, padding: 3, minHeight:"40vh",}}>
      <Typography
        sx={{ textAlign: "center", marginBottom: "1rem"}}
        variant="h4"
      >
        Vanliga frågor och svar
      </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" component="h1">
            Vad är kostar leveransen?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1">
            Leverans med Postnord kostar 19 kr, Schenker kostar 29 kr, Instabox
            kostar 29 kr.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" component="h1">
            När får jag min leverans?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1">
            Leverans med Postnord hem till brevlådan tar 1-3 arbetsdagar,
            spårbar leverans med Schenker tar 1-2 arbetsdagar, leverans till box
            med Instabox tar 1-2 arbetsdagar.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" component="h1">
            Vilka betalsätt kan jag välja?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1">
            Våra betalmedel är Klarna (delbetalning, betala senare eller 30 dagars faktura.), Swish samt kortbetalning med Visa, Maestro eller MasterCard.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
    </Container>
  );
}

export default FaqPage;
