const connectToDb = require("./database/connect");
const getDataFromDB = require("./database/queries");
const getSentimentFromAPI = require("./api");
const Text = require("./models/text");
const dataClassifier = require("./database/dataClassifier");
const apiConfig = require("../config").sentimentAPI[1];


/**
 * Update DB with the value returned by the Sentiment API
 *
 * Recursive method that calls the Sentiment API for all the given items
 * and updates the DB with the API's response
 *
 * @HACK Use of setTimeout is for API restrictions per ${time}.
 */
const updateDBwithSentiment = (items, index) => {
  // The item we want to update
  const item = items[index];

  /**
   *  Get from the Google Sentiment API response the sentiment polarity
   */
  getSentimentFromAPI(item.content, apiConfig, (er, response, body) => {
    // Log any errors and terminate the process.
    if (er) {
      console.log("GET FROM API FAILED", er);
      process.exit();
    }

    // Classify the API Polarity as { negative, neutral, positive }
    const sentimentPolarity = dataClassifier(
      apiConfig.responseFormat(body),
      apiConfig.classifier
    );

    // Update the item in the DB
    Text.update({ id: item.id }, { [apiConfig.polarityName]: sentimentPolarity }, (err, raw) => {
      // Log any errors and exit the process.
      if (err) {
        console.log("ERROR UPDATING THE DATABASE ITEM", item.id, err, raw);
        process.exit();
      }

      /**
       *  If current item is not the last one call the updateDBwithSentiment for the next item
       */
      if (index + 1 < items.length) {
        setTimeout(() => {
          const newIndex = index + 1;
          updateDBwithSentiment(items, newIndex);
        }, 100);
      }

      console.log("SUCCESSFULLY UPDATED DB ITEM", index + 1, "WITH POLARITY: ", sentimentPolarity);
    });
  });
};

/**
 * Get the data from the database and then update it with
 * the sentiment polarity from the API
 */
connectToDb(() => {
  getDataFromDB(apiConfig.polarityName, (error, text) => {
    // When the data from the db come update it with the API.
    updateDBwithSentiment(text, 0);
  });
});
