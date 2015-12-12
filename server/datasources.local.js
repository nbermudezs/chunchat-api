var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/main';

console.log('MONGOLAB_URI ENV VAR: ');
console.log(process.env.MONGOLAB_URI);

module.exports = {
  mongodb: {
    defaultForType: "mongodb",
    connector: "mongodb",
    url: mongoUri
  }
};
