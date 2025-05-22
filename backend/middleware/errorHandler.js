// Importera constants för att använda definierade felkoder
const { constants } = require("../constants");

// Error handler funktion som fångar upp och hanterar fel
const errorHandler = (err, req, res, next) => {
  // Hämta statuskoden från svaret, eller sätt den till 500 (Server Error) om den inte är satt
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Använd switch-case för att hantera olika typer av fel beroende på statuskoden
  switch (statusCode) {
    // Om statuskoden är en valideringsfel
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed", // Felrubrik
        message: err.message, // Felmeddelande
        stackTrace: err.stack, // Stacktrace för felsökning
      });
      break;

    // Om statuskoden är "Not Found" (404)
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found", // Felrubrik
        message: err.message, // Felmeddelande
        stackTrace: err.stack, // Stacktrace för felsökning
      });
      break;

    // Om statuskoden är "Unauthorized" (401)
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized", // Felrubrik
        message: err.message, // Felmeddelande
        stackTrace: err.stack, // Stacktrace för felsökning
      });
      break;

    // Om statuskoden är "Forbidden" (403)
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden", // Felrubrik
        message: err.message, // Felmeddelande
        stackTrace: err.stack, // Stacktrace för felsökning
      });
      break;

    // Om statuskoden är "Server Error" (500)
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error", // Felrubrik
        message: err.message, // Felmeddelande
        stackTrace: err.stack, // Stacktrace för felsökning
      });
      break;

    // Om statuskoden inte matchar någon av ovanstående fall, logga ett meddelande
    default:
      console.log("No error, all good"); // Om ingen felstatus är satt
      break;
  }
};

// Exportera errorHandler-funktionen för att användas i andra delar av applikationen
module.exports = errorHandler;
