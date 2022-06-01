import { ThemeProvider } from "@emotion/react";
import { Box, Container, createTheme, Typography } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: 20,
        },
      },
    },
  },
});

function TermsOfUsePage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ bgcolor: "#ffffff", mt: 2, padding: 3, minHeight: "40vh" }}>
        <ThemeProvider theme={theme}>
          <Typography sx={{ marginBottom: "2rem" }} gutterBottom variant="h4">
            Terms of use
          </Typography>
          <Typography gutterBottom variant="h5">
            Refund
          </Typography>
          <Typography gutterBottom>
            Normally takes place within 14 working days of receiving
            notification of your request regret / return. However, at the
            earliest from the time we receive and approve your return, and will
            be made in the same way as the original payment if nothing else has
            been expressly agreed
          </Typography>
          <Typography gutterBottom variant="h5">
            Reservations
          </Typography>
          <ul>
            <li>
              We reserve ourselves against delays that we cannot control, such
              as extreme weather conditions, force majeure or technical problems
              with the freight forwarder, delays due to congestion at the
              shipping company, etc.
            </li>
            <li>
              Geographically remote delivery locations, such as Gotland and
              locations there the postcode starts with the number 9. It usually
              takes 1-2 days extra delivery time.
            </li>
            <li>
              In addition to other geographical additions, rural letter carrier
              means also an extra day in delivery time.
            </li>
            <li>
              In addition to other geographical additions, rural letter carrier
              means also an extra day in delivery time.
            </li>
            <li>
              Orders sent on pallets and / or with home delivery are excluded
              from our normal delivery terms. This applies, for example products
              such as larger grills, furniture, etc. For this type of delivery
              method applies to 1-7 days delivery time + any extra days
              according to the reservation points.
            </li>
          </ul>
          <Typography gutterBottom variant="h5">
            Visible shipping damage
          </Typography>
          <Typography gutterBottom>
            In the event of any shipping damage, the report must be made
            directly by you on site - before you receive the goods. Even a minor
            damage to the outer carton should reported.
          </Typography>
          <Typography gutterBottom>
            Please note that you must not try to repair or assemble the product
            before it has been inspected by the forwarder's complaint manager.
            The original packaging must be retained.
          </Typography>
          <Typography gutterBottom>
            After the report has been made to the responsible freight forwarder,
            please contact us a complaint number if the damage caused damage to
            your product.
          </Typography>
          <Typography gutterBottom variant="h5">
            Hidden shipping damage
          </Typography>
          <Typography gutterBottom>
            In the event of a hidden shipping damage, a report must be made by
            you as soon as possible Schenker or responsible freight forwarder.
            After notification made to the freight forwarder please contact us
            with a complaint number.
          </Typography>
          <Typography gutterBottom variant="h5">
            Collection of orders / Legitimation
          </Typography>
          <Typography gutterBottom>
            To collect packages from your agent, you need a valid one
            identification.
          </Typography>
          <Typography gutterBottom>
            Please note that valid identification must be presented at
            collection of packages at agents. The recipient name in the order
            must match with the name on the collector's ID. Do not use nicknames
            in your order, and always address to the person physically will pick
            up the package.
          </Typography>
          <Typography gutterBottom variant="h5">
            Right of withdrawal
          </Typography>
          <Typography gutterBottom>
            When buying goods, a 14-day right of withdrawal always applies in
            accordance with applicable consumer protection legislation. This
            means that the customer has the right to cancel their purchase by
            notifying them within 14 days of it that the customer or the
            customer's representative has received the ordered item (withdrawal
            period). If you regret your purchase, you can return the product and
            get your money back. The right of withdrawal does not apply to
            hygiene products. One fee can be deducted from your refund if the
            product is returned in deteriorated condition, ie in case of
            defective packaging or obvious damage to the product, price
            deductions will be made between 30-100% of the product value. We do
            not bear the return shipping cost to us and do not reimburse lost
            packages, ie you as the customer are responsible for the shipment
            reaches us. Contact us by email before sending back the package for
            to receive a return slip and / or further instructions
          </Typography>
        </ThemeProvider>
      </Box>
    </Container>
  );
}

export default TermsOfUsePage;
