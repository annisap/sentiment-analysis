const path = require("path");

/**
 * For the API to run it is required that we provide an API KEY.
 * Follow the instruction in each tool's website to get one.
 */
const GOOGLE_API_KEY = "ENTER_YOUR_API_KEY_HERE";
const INDICO_API_KEY = "ENTER_YOUR_API_KEY_HERE";

module.exports = {
  // Datasets Used by the tool
  datasets: [
    {
      path: path.join(__dirname, "./datasets/dataset_one.json"),
      classifier: {
        negative: 0,
        positive: 4,
        neutral: 2
      }
    },
    {
      path: path.join(__dirname, "./datasets/dataset_two.json"),
      classifier: {
        negative: "negative",
        neutral: "neutral",
        positive: "positive"
      }
    },
    {
      path: path.join(__dirname, "./datasets/dataset_IMDB.json"),
      classifier: {
        negative: 0,
        positive: 1
      }
    }
  ],
  // The API of the NLP tools we will use to classify our datasets
  sentimentAPI: [
    // The Google NLP API
    {
      url: `https://language.googleapis.com/v1beta1/documents:analyzeSentiment?key=${GOOGLE_API_KEY}`,
      polarityName: "googlePolarity",
      dataFormat: (contentToClassify) => {
        return {
          document: {
            content: contentToClassify,
            type: "PLAIN_TEXT",
            language: "EN"
          }
        };
      },
      responseFormat: (responseBody) => {
        return responseBody.documentSentiment.polarity;
      },
      classifier: {
        negative: {
          from: -1,
          to: 0.75
        },
        neutral: {
          from: 0.75,
          to: 0.25
        },
        positive: {
          from: 0.25,
          to: 1
        }
      }
    },
    // The Indico NLP API
    {
      url: "https://apiv2.indico.io/sentiment",
      polarityName: "indicoPolarity",
      dataFormat: (contentToClassify) => {
        return {
          "api_key": INDICO_API_KEY,
          "data": contentToClassify
        };
      },
      responseFormat: (responseBody) => {
        return responseBody.results;
      },
      classifier: {
        negative: {
          from: -1,
          to: 0.5
        },
        positive: {
          from: 0.5,
          to: 1
        }
      }
    }
  ]
};
