const mongoose = require("mongoose"); // Här importerar vi mongoose, ett bibliotek för att arbeta med MongoDB-databaser i Node.js

// Här definierar vi en funktion för att ansluta till databasen
const connectDB = async () => {
  try {
    // Ansluta till databas
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);

    // Logga anslutningsinformation
    console.log(
      "Database connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; // Exportera connectDB-funktionen så att den kan användas i andra delar av applikationen
