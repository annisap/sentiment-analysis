const request = require("request");

/**
 * POST the given content to the api as specified in the config.
 *
 * @param {String} content The content we want to update
 * @param {Object} apiConfig The configuration for the API
 * @param {Function} successCallback
 *  Gets called with three parameters
 *  error: The error from the API if any.
 *  response: The response from the API.
 *  body: The body of the response from the API call.
 */
const getSentimentFromAPI = (content, apiConfig, successCallback) => {
  const body = apiConfig.dataFormat(content);

  request({
    method: "POST",
    url: apiConfig.url,
    body,
    json: true,
    callback: successCallback
  });
};

module.exports = getSentimentFromAPI;


