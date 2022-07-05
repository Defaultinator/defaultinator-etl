const unreviewed = require('./credentials.json');
const reviewed = require('./credentials.reviewed.json');

const formatData = (record) => {
  const {
    username,
    password,
    references,
    protocol,
    part,
    vendor,
    product,
    version,
  } = record;

  return {
    username: username,
    password: password,
    references: references,
    protocol: protocol,
    cpe: {
      part: part,
      vendor: vendor,
      product: product,
      version: version,
    }
  }
}

const credentials = [
  ...reviewed.map((item) => ({...formatData(item), isVerified: true})), 
  ...unreviewed.map((item) => formatData(item))
];

module.exports = {
  credentials,
}