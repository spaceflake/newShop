# Dynamisk Webbutveckling Slutprojekt

<br>

### School: Medieinsitutet Gothenburg

### Class: FED21G

### Grupp: 3

### Date: 2022-06-03

<br>

## Developers:

- _Tomas Fridekrans_ (https://github.com/spaceflake)

- _Hazem Kawas_ (https://github.com/hazem-89)

- _Philip Risberg_ (https://github.com/Prisberg)

- _Emil Hagelin_ (https://github.com/empafrontend)

<br>

### Projektledare

- _Tomas Fridekrans_

### Teacher: David Jensen

<br>

## Intro

I denna uppgift skall vi bygga en webbshops-applikation inkluderande en klient och en server. Servern ska vara kopplad till en mongodb databas och vara strukturerad baserad på ett REST-API med resurser.

## Krav

- [x] Alla sidor skall vara responsiva. (G)
      (Genom att använda `CSS`)

- [x] Arbetet ska implementeras med en React frontend och en Express backend. (G)
      (Vi använde oss av `React` för `Client` och `Express` för `Server`)

- [x] Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet G)
      (Vi använde oss `Figma` och sedan presenterade det för våran `handledare`)

- [x] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)
      (Presenterat för `handledaren`)

- [x] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G)
      (Skapat resurser i databasen där respektiva data hanteras till kollektioner)

- [x] Man ska kunna logga in som administratör i systemet (G)
      (Har använt Passport samt middleware för att styra tillgång till resurser)

- [x] Inga Lösenord får sparas i klartext i databasen (G)
      (Genom att använda `bcrypt`)

- [x] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
      (Detta gör vi med endpoints. Besökaren skickar samlingen av kompletta produkter, sin adress till servern som sedan slår ihop dem till en order som skickas tillbaks till client)

- [x] Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)
      (kommentar)

- [x] Administratörer ska kunna se en lista på alla gjorda beställningar (G)
      (Genom ett `fetch-anrop` till klientsidan från databasen)

- [x] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
      (När man skapar en produkt krävs att man sät)

- [x] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
      (Produkterna skickas från server till client och mappas ut, på produkt datan finns en string array som innehåller kategorierna. String arrayen extraheras från produkterna och mappas ut som knappar. Trycker man på en knapp används dess string som search param och utifrån den parametern filtreras produkterna. )

- [x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)
      (Med hjälp av `localstorage`)

- [x] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)
      (Med hjälp av )

- [x] Besökare ska kunna välja ett av flera fraktalternativ (G)
      (Med hjälp av ett `formik-formulär`)

- [x] Tillgängliga fraktalternativ ska vara hämtade från databasen (G)
      (Genom våra `endpoints` för den resursen)

- [x] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)
      (Genom `formik` och `yup`)

<br>

- [x] Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen (VG)
      (kommentar)

- [x] En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången (VG)
      (kommentar)

- [x] Administratörer ska kunna markera beställningar som skickade (VG)
      (kommentar)

- [x] När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)
      (kommentar)

- [x] Administratörer ska kunna redigera vilka kategorier en produkt tillhör(VG)
      (kommentar)
- [x] Administratörer ska kunna lägga till och ta bort produkter(VG)
      (kommentar)

- [x] Backendapplikationen måste ha en fungerande global felhantering (VG)
      (Genom att skapa en `felhanterare`)

<br>

### Hur man kör projektet.

Öppna terminalen i din code-editor, skriv sedan `cd server` och `npm i`.

Efter alla moduler laddats ner skriv `npm start` för att köra servern på `port 4000`.

<br>

När `npm` för `server` är klart skriv `cd client` och `npm i`.

När modulerna är nedladdade skriv `npm start` för att köra projektet i browsern.

<br>

### Inloggningsuppgifter för Admin

`Username:` (fille.risberg@live.se)
`Password:` (password)
