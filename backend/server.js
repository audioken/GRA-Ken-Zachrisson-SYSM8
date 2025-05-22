const express = require("express"); // Här importerar vi express som är ett ramverk för att bygga webbapplikationer i Node.js
require("dotenv").config(); // Här importerar vi dotenv för att hantera miljövariabler som API-nycklar eller databaskonfigurationer
// const { connect } = require("mongoose"); // Här importerar vi connect-funktionen från mongoose för att ansluta till databasen
const connectDB = require("./config/dbConnection"); // Här importerar vi vår databasanslutning
const errorHandler = require("./middleware/errorHandler"); // Här importerar vi vår felhanteringsmiddleware

connectDB(); // Här anropar vi funktionen för att ansluta till databasen

const cors = require("cors"); // Här importerar vi cors för att hantera Cross-Origin Resource Sharing

const app = express(); // Här skapar vi en instans av express-applikationen

app.use(cors()); // Här använder vi cors-middleware för att tillåta CORS-förfrågningar

const PORT = process.env.PORT || 3000; // Här hämtar vi portnumret från miljövariabler, om det inte finns så används 3000 som standardport

// Middleware
app.use(express.json()); // Här använder vi express.json() för att kunna hantera JSON-data i inkommande förfrågningar

app.use(express.static("public")); // Gör public-mappen tillgänglig för frontend

app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes")); // Här kopplar vi ihop vår användar-rutt med huvudapplikationen
app.use("/api/orders", require("./routes/orderRoutes")); // Här kopplar vi ihop vår order-rutt med huvudapplikationen

app.use(errorHandler); // Här använder vi vår felhanteringsmiddleware för att fånga och hantera fel i applikationen

app.listen(PORT, () => {
  // Här startar vi servern och lyssnar på den angivna porten
  console.log(`Server is running on port http://localhost:${PORT}`); // Här loggar vi en bekräftelse på att servern körs
});
