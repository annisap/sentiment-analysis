# Sentiment Analysis Project

This project aims to evaluate the current state of sentiment analysis APIs effectiveness in Online Social Networks. To achieve that, a cross-platfoorm and generic tool is developed that handles the request and responses in a node.js environment.
Firstly, we selected three public sentiment polarity-tagged data sets as the baseline of reliable sentiment values. Then we stored these datasets in MongDB and lastly we employed Indico and Google Natural Language (NL) API's.

## Datasets Used

DatasetOne (datasetID: 0): 2034 tweets from which 632 are positive and 1402 negative [Data Source](http://oro.open.ac.uk/40660/).

DatasetTwo (datasetID: 1): 797 tweets from which 215 are positive, 406 are negative and 176: neutral [DataSource](https://bitbucket.org/speriosu/updown/src/1deb8fe45f603a61d723cc9b987ae4f36cbe6b16/data/hcr/test/orig/?at=default).

DatasetImdb (datasetID:2): 748 sentences from IMDB reviews that 386 are positive and 362 are negative [Data Source](https://archive.ics.uci.edu/ml/datasets/Sentiment+Labelled+Sentences#).


## Requirements

To run the project, it is required that the following are installed in your system:

- [Node.js](https://nodejs.org/en/) version: "^4.5"
- [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community) version: "^3.2.9"

Due to security reasons you must use your own API keys for the APIs to work.
To get an API key from Google follow the instructions [here](https://cloud.google.com/natural-language/docs/getting-started)
To get an API key from Indico follow the instructions [here](https://indico.io/docs#text)

After getting your API keys add them to the corresponding variables in the config.js file.

## Running the project

Install the required dependencies

```js
npm install
```

Open the database

```js
npm run opendb
```

Populate the database

```js
npm run populate
```

Run the application

```js
npm run init
```

## Using the tool with different datasets / APIs

### To use your datasets:

In the root folder of the project is the config.js where you can add the specifications of your datasets.

  In the datasets object you need to add:

  ```js
    ...
    datasets: [
      ...
      {
        path: path.join(__dirname, 'THE PATH TO THE DATASET JSON FILE'),
        classifier: {
          negative: NEGATIVE_VALUE FOR CLASSIFIER,
          positive: POSITIVE_VALUE FOR CLASSIFIER
        }
      }
      ...
    ]
    ...
  ```

The classifier accepts numbers, strings and number ranges.
In case of number ranges a { from: STARTING_VALUE, to: END_VALUE } object should be passed in the classifiers property.

The dataset should be in the JSON format and each text should have the following properties:

- id: A unique identifier for the text.
- content: The text.
- polarity: The sentiment value of the text that is defined in the classifier

### To use different APIs

In the config.js file you can define your own APIs to use.

Each API requires:

- url : The url in which we will post the content
- polarityName: The name of the polarity that we want to give in our DB. ( e.g. GooglePolarity )
- dataFormat: A function that takes the content we want to sent to the API and returns an object as it is required by the specific API.
- responseFormat: A function that takes the response body and returns the polarity value retrieved by the API.
- classifier: The same as the dataset classifier. It is used to classify the polarity returned by the API.
