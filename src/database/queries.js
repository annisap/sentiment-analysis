const Text = require("../models/text");


/**
 * Get all the data from the Database.
 *
 * @param {String} polarityName The name of the sentiment polarity we want to update
 * @param {Function} callback The function that will be called when the data have been retrieved.
 */
const getDataFromDB = (polarityName, callback) => {
  const fields = "content id";
  // Use the whole db length as limit since we want to retrieve all the data
  Text.count({}, (er, limit) => {
    if (er) {
      console.log(er);
    }
    Text.find({ [polarityName]: null }, fields, { limit }, (err, text) => {
      callback(err, text);
    });
  });

};

module.exports = getDataFromDB;
