var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/main';

module.exports = {
  mongodb: {
    defaultForType: "mongodb",
    connector: "mongodb",
    url: mongoUri
  },

  sendgrid: {
    connector: "loopback-connector-sendgrid",
    api_user: process.env.SENDGRID_API_USER,
    api_key: process.env.SENDGRID_API_KEY
  }
};
