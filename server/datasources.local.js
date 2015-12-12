var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/main';

module.exports = {
  mongodb: {
    defaultForType: "mongodb",
    connector: "mongodb",
    url: mongoUri
  }
};
