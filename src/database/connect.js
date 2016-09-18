const mongoose = require("mongoose");

/**
 * Connect the app to the MongoDB
 *
 * @param {Function} successCallback
 *  Gets called when the connection is successfull
 */
const connectToDB = (successCallback) => {
// Connect to the database
  mongoose.connect("mongodb://localhost/sentidb");

// Get the connection instance for later use
  const database = mongoose.connection;

// Handle the database connection success
  database.once("open", () => {
    successCallback();
    console.log("DB_CONNECTION_SUCCESS");
  });

// Handle the database connection error
  database.on("error", (err) => {
    console.log("DB_CONNECTION_ERROR: ", err);
  });
};

module.exports = connectToDB;
