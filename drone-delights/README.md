# Projektanalys – Drone Delights

Målet med projektet var att skapa **Drone Delights** – en responsiv enkel webbutik med JWT-autentisering, en backend i Node.js och stöd för både desktop och mobil. Jag ville bygga en komplett fullstack-applikation som visar att jag behärskar hela utvecklingsprocessen – från design till implementation.

## Design och förarbete

Jag började med att skissa applikationen i **Figma**, där jag designade samtliga fönster för desktopversionen. För att förenkla övergången till kod tänkte jag i komponenter redan från början. Komponenterna hölls stilmässigt "smala", vilket underlättade mobilanpassning via media queries.

Det var tydligt hur stor skillnad det gjorde att ha designen klar innan jag började koda – jag kunde överföra mått och färger direkt från Figma till HTML, vilket sparade tid och gjorde utvecklingen mer effektiv.

Jag designade även logotypen med hjälp av ChatGPT, vilket sparade massor av tid i designfasen.

## Implementation och teknikval

Jag arbetade stegvis, sida för sida, och fokuserade på att logiken i koden skulle fungera korrekt. När grunden var satt, stylade jag med CSS för att skapa ett mer visuellt tilltalande gränssnitt.

Inledningsvis använde jag **JSON Server** för att snabbt simulera en databas. Jag bytte sedan till en egen **Node.js-backend** med **JWT-autentisering**, vilket gjorde autentisering möjlig på riktigt och gav värdefull erfarenhet med tokens och middleware. Det gav större kontroll och en mer realistisk lösning.

För att minska upprepad kod och förenkla datainhämtning skapade jag ett eget custom hook – **useFetch**. Det förenklade hanteringen av asynkrona anrop och gav en mer kompakt och lättläst kodbas.

Jag skapade också flera contexts (bl.a. **CartContext**, **CategoryContext**, **AuthContext**) för att kunna nå variabler och funktioner globalt i projektet. Detta ökade flexibiliteten, minskade behovet av props-drilling och resulterade i mindre och renare kod.

För att skydda specifika vyer byggde jag en **ProtectedRoute-komponent** som används på **/user-sidan**. Eftersom jag ville att man skulle kunna genomföra ett köp utan att vara inloggad, var endast denna vy skyddad. Jag insåg dock sent att det hade varit smart att kräva e-postadress även vid gästköp, så att kvitto kunde skickas automatiskt.

### Tekniska val:

- **Figma** – design av gränssnittet  
- **HTML/CSS** – struktur och styling  
- **JavaScript (Node.js)** – backend  
- **JWT** – autentisering  
- **JSON Server** – tidig datasimulering  
- **Masonry-layout** – flexibel visning av produktkort  
- **FontAwesome** – ikoner  
- **CSS-variabler** – hantering av färger och fonter i `:root`

Jag använde **Masonry-layout** för att visa produktkort på ett flexibelt sätt. Det möjliggjorde utökad information i varje kort utan att bryta layouten.  
För ikoner använde jag **FontAwesome**, vilket gjorde det enkelt att styla dem direkt i HTML.

Alla färger och fonter lades som CSS-variabler i `:root`, vilket gjorde det smidigt att ändra teman och hålla styling konsekvent.

## Utmaningar och lösningar

### Backend och datalagring

Att strukturera backend-logiken var en av de största utmaningarna. Jag tog inspiration från en skoluppgift i Node.js men anpassade mycket för att passa projektets behov. En viktig förändring var hur jag hanterade favoriter:

- Jag gick från att använda en `isFavourite`-flagga i varje produkt till att istället spara favoriter som en lista i användarens data.  
  Det blev en mer flexibel och tydligare backend-lösning.

### Validering

Jag skapade en separat `validateInputs`-funktion i mappen `utils`, där jag samlade logik för live-validering av fält som användarnamn och lösenord. Det gav bättre användarupplevelse med tydliga färgindikationer och felmeddelanden.

### Designmissar

Ett tydligt hinder uppstod när jag skulle bygga **orderbekräftelsesidan** – en vy jag glömt att designa i Figma. Det blev tydligt hur mycket tid det kostar att designa direkt i kod jämfört med att följa en färdig plan.

### Växande kodbas

I takt med att projektet växte blev det svårare att hålla struktur. Jag märkte hur viktig **konsekvent namngivning** är – jag fick byta många klassnamn i efterhand vilket tog tid. Samtidigt lyckades jag dela upp mycket av koden i återanvändbara komponenter, t.ex. knappar, vilket gjorde det enklare att underhålla och vidareutveckla.

Under utvecklingen utvecklade min mappstruktur sig till en hybrid mellan featurebaserad och typebaserad organisering, något jag lärde mig mycket av, och i nästa projekt planerar jag att välja en tydlig strategi för att hålla strukturen konsekvent och lättnavigerad.

## Reflektion och framtida förbättringar

Det här projektet har stärkt mitt självförtroende som systemutvecklare. Jag har fått större förståelse för vad som krävs i ett fullstack-projekt och hur viktigt det är att planera både kod och design i förväg.  

Jag känner att jag ibland skriver kod på ett ganska "klumpigt" sätt. Vissa komponenter blev onödigt stora i början, men genom att refaktorisera och bryta ut mindre komponenter lärde jag mig vikten av tydligt ansvar. Jag har blivit bättre på att reflektera, felsöka och anpassa lösningar.

### Till nästa projekt vill jag:

- Använda ett CSS-ramverk som **Tailwind** för bättre struktur  
- Vara ännu mer noggrann med **klassnamngivning**  
- Designa **hela gränssnittet i förväg**, inklusive mindre sidor  

### Funktioner jag vill lägga till i framtiden:

- Orderhistorik  
- Adminpanel för hantering av ordrar och användare  
- Utökad filtrering och sökning  
- Bättre feedback vid t.ex. "lägg i varukorgen"  
- Animationer för en mer levande upplevelse  

## Sammanfattning

Jag känner att jag börjar hitta mitt eget sätt att jobba – ett arbetssätt som kombinerar noggrann planering med kreativ problemlösning. Även om inte allt blev klart, har projektet gett mig en stabil grund och viktiga insikter. Jag har lärt mig hur jag vill arbeta i framtiden – med tydligare struktur, bättre planering och mer reflektion kring teknikval. Det här projektet är ett stort steg i min utveckling som systemutvecklare. Det har visat mig hur mycket jag faktiskt kan åstadkomma – och hur mycket mer jag vill lära mig. Överlag är jag väldigt nöjd med applikationen. Jag tycker den blev tilltalande och enkel, vilket var ett av mina mål.