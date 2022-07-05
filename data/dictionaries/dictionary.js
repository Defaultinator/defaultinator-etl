const rawDictionary = require('./dictionary.json');

const dictionary = rawDictionary.map((item) => ({...item, source: 'NVD'}));

module.exports = {
  dictionary,
}