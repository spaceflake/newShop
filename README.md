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

### GODKÄNT

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
      (Genom ett `edit-forumlär`)

- [x] Administratörer ska kunna se en lista på alla gjorda beställningar (G)
      (Genom ett `fetch-anrop` till klientsidan från databasen. Presenteras en tabell med orderstatus, produkter, leveransadress)

- [x] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
      (När man skapar en produkt krävs att man sätter en `string[]`och den `string[]`används för att dela upp katergorierna)

- [x] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
      (Produkterna skickas från server till client och mappas ut, på produkt datan finns en string array som innehåller kategorierna. String arrayen extraheras från produkterna och mappas ut som knappar. Trycker man på en knapp används dess string som search param och utifrån den parametern filtreras produkterna. )

- [x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)
      (Med hjälp av `localstorage`)

- [x] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)
      (Med hjälp av en `currentUser` som kollar om någon användare är inloggad )

- [x] Besökare ska kunna välja ett av flera fraktalternativ (G)
      (Med hjälp av ett `formik-formulär`)

- [x] Tillgängliga fraktalternativ ska vara hämtade från databasen (G)
      (Genom våra `endpoints` för den resursen)

- [x] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)
      (Genom `formik` och `yup`)

<br>

### VÄL GODKÄNT

- [x] Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen (VG)
      (Endpoints finns för att registrera en önskan om att bli admin, existerande admins måste sen godkänna.)

- [x] En administratör behöver godkännas av en tidigare administratör innan man kan logga in första gången (VG)
      (-||-)

- [x] Administratörer ska kunna markera beställningar som skickade (VG)
      (Endpoint för att uppdatera order status, genom knapp på öppnad accordion på ordertabellen. Visas om inte ordern är skickad.)

- [x] När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)
      (Användare har en egen sida. Orders med status hämtas från endpoint)

- [ ] Administratörer ska kunna redigera vilka kategorier en produkt tillhör(VG)
      (Avgränsing, behöver välja flera kategorier, då sista inte läggs till.)
- [x] Administratörer ska kunna lägga till och ta bort produkter(VG)
      (Går att lägga till nya produkter)

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

`Username:`fille.risberg@live.se
`Password:`password

 <br>

## Links

[REPO](https://github.com/spaceflake/newShop)
