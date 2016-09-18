/**
 * Given a polarity value and a classifier returns
 * the corresponding classifiers property
 */
const classifyPolarity = (polarityValue, classifier) => {
  let result = null;


  // Iterrate through each property in the classifier
  for (const polarityClass in classifier) {

    // Check if classifiers class has a from/to Range.
    if (classifier[polarityClass] && classifier[polarityClass].from) {

      if (classifier[polarityClass].from <= polarityValue && classifier[polarityClass].to >= polarityValue) {
        // Update the result with the property value
        result = polarityClass;
      }

    // Else check if the value is equal to the Class's value
    } else if (polarityValue === classifier[polarityClass]) {
      // Update the result with the property value
      result = polarityClass;
    }
  }

  // Return the classifier's corresponding class
  return result;
};

module.exports = classifyPolarity;
