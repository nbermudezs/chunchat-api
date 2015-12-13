var config = require('./../conf');
var mongoUri = config.get('MONGOLAB_URI') ||
  config.get('MONGOHQ_URL') ||
  'mongodb://localhost/main';

module.exports = {
  mongodb: {
    defaultForType: 'mongodb',
    connector: 'mongodb',
    url: mongoUri
  },

  sendgrid: {
    connector: 'loopback-connector-sendgrid',
    api_user: config.get('SENDGRID_APIUSER'),
    api_key: config.get('SENDGRID_APIKEY')
  }
};
