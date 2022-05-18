import { ThemeProvider } from '@emotion/react';
import { Box, Container, createTheme, Typography } from '@mui/material';

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
      <Box sx={{ bgcolor: "#ffffff", mt: 2, padding: 3, minHeight:"40vh",}}>
      <ThemeProvider theme={theme}>
        <Typography sx={{ marginBottom: '2rem' }} gutterBottom variant="h4">
          Allmänna villkor
        </Typography>
        <Typography gutterBottom variant="h5">
          Återbetalning
        </Typography>
        <Typography gutterBottom>
          Sker normalt inom 14 arbetsdagar från att vi mottagit besked om önskat
          ånger/retur. Dock tidigast från att vi mottagit och godkänt din retur,
          och kommer att ske på samma sätt som den ursprungliga betalningen om
          inget annat uttryckligen avtalats
        </Typography>
        <Typography gutterBottom variant="h5">
          Reservationer
        </Typography>
        <ul>
          <li>
            Vi reserverar oss mot förseningar som vi inte kan råda över som t.ex
            extrema väderförhållanden, force majeure eller tekniska problem hos
            speditören, förseningar pga överbelastning hos fraktbolaget osv.
          </li>
          <li>
            Geografiskt avlägsna leveransorter, exempelvis Gotland och orter där
            postnumret börjar på siffran 9. Det brukar ta 1-2 dagar extra i
            leveranstid.
          </li>
          <li>
            Lantbrevbäring innebär utöver andra eventuella geografiska tillägg
            också en extra dag i leveranstid.
          </li>
          <li>
            Lantbrevbäring innebär utöver andra eventuella geografiska tillägg
            också en extra dag i leveranstid.
          </li>
          <li>
            Beställningar som skickas på pall och/eller med hemleverans undantas
            från våra normala leveransvillkor. Detta gäller till exempel
            produkter som större grillar, möbler etc. För denna typ av
            leveranssätt gäller 1-7 dagars leveranstid + eventuella extra dagar
            enligt reservations punkterna.
          </li>
        </ul>
        <Typography gutterBottom variant="h5">
          Synlig fraktskada
        </Typography>
        <Typography gutterBottom>
          Vid eventuell fraktskada ska anmälan göras direkt av dig på plats -
          innan ni kvitterar godset. Även en smärre skada på ytterkartongen ska
          anmälas.
        </Typography>
        <Typography gutterBottom>
          Observera att du absolut inte får försöka laga eller montera produkten
          innan den blivit besiktigad av speditörens reklamations ansvariga.
          Originalemballaget ska behållas.
        </Typography>
        <Typography gutterBottom>
          Efter anmälan gjorts hos ansvarig speditör vänligen kontakta ossmed
          ett reklamationsnummer om skadan orsakat åverkan på din produkt.
        </Typography>
        <Typography gutterBottom variant="h5">
          Dold fraktskada
        </Typography>
        <Typography gutterBottom>
          Vid en dold fraktskada måste en anmälan göras av dig snarast hos
          Schenker eller ansvarig speditör. Efter anmälan gjorts hos speditören
          vänligen kontakta oss med ett reklamationsnummer.
        </Typography>
        <Typography gutterBottom variant="h5">
          Uthämtning av order / Legitimering
        </Typography>
        <Typography gutterBottom>
          För att hämta ut paket hos ditt ombud behöver du en giltig
          legitimation.
        </Typography>
        <Typography gutterBottom>
          Observera att giltig legitimation måste kunna uppvisas vid uthämtning
          av paket hos ombud. Mottagarnamnet i beställningen måste överensstämma
          med namnet som står på uthämtarens legitimation. Använd inga smeknamn
          i din beställning, och adressera alltid till den person som fysiskt
          ska hämta ut paketet.
        </Typography>
        <Typography gutterBottom variant="h5">
          Ångerrätt
        </Typography>
        <Typography gutterBottom>
          Vid köp av varor gäller alltid 14 dagars ångerrätt i enlighet med
          gällande konsumentskyddslagstiftning. Detta innebär att kunden har
          rätt att ångra sitt köp genom att meddela detta inom 14 dagar från det
          att kunden eller kundens ombud tagit emot den beställda varan
          (ångerfristen). Om du ångrar ditt köp kan du returnera produkten och
          få pengarna tillbaka. Ångerrätten gäller inte för hygienprodukter. En
          avgift kan dras av från din återbetalning om produkten returneras i
          försämrat skick, dvs vid defekt förpackning eller uppenbar åverkan på
          produkten kommer prisavdrag att ske mellan 30-100 % av produktens
          värde. Vi står ej för retur fraktkostnaden till oss och ersätter inte
          borttappade paket dvs det är du som kund som ansvarar att försändelsen
          når oss. Kontakta oss via e-post innan du skickar tillbaka paketet för
          att motta en retursedel och/eller vidare instruktioner.
        </Typography>
      </ThemeProvider>
    </Box>
    </Container>
  );
}

export default TermsOfUsePage;
