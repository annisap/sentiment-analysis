const connectToDB = require("./connect");
const classifyPolarity = require("./dataClassifier");
const Text = require("../models/text");

const config = require("../../config");
const datasetsToUpload = config.datasets;

/**
 * Uploads the given JSON data to the database
 * with their sentiment data classified as specified in the configuration
 *
 * @param {Object} jsonData
 * @param {Object} classifier
 */
const uploadJSONtoDB = (jsonData, classifier, datasetId) => {
  let counter = 0;
  const dataLength = jsonData.length;

  console.log("Dataset Length is: ", dataLength);

  // Iterrate though all the Data
  jsonData.forEach((item, index) => {

    // Clasify the item's polarity based on the datasetOne classifier
    if (!isNaN(item.polarity)) {
      item.polarity = classifyPolarity(item.polarity, classifier);
    }

    // Create a new Text model based on the data
    const newItem = new Text({
      id: item.id,
      polarity: item.polarity,
      content: item.content,
      datasetId
    });

    // Save the newItem to the DB
    newItem.save((err) => {
      if (err) {
        console.log("Error: Data could not be saved in the DB. Stack trace \n", err);
      } else {
        console.log("DATA_SAVED_SUCCESSFULLY. DATA_ID:", index);
        counter++;
        if (counter === dataLength) {
          console.log("DATABASE ", index, " POPULATED");
        }
      }
    });

  });
};

/**
 * Take an array of JSON datasets and uploads them in the
 * database.
 *
 * @param {Array<DataSet>} datasets
 */
const uploadDatasetsToDB = (datasets) => {
  datasets.forEach((dataset, index) => {
    const datasetJSON = require(dataset.path);
    uploadJSONtoDB(datasetJSON, dataset.classifier, index);
  });
};

/**
 * Connect to the database and then upload all the datasets
 */
connectToDB(() => {
  uploadDatasetsToDB(datasetsToUpload);
});


