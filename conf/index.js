var nconf = require('nconf');

// set default separator for ENV vars like: OPENTOK_API_KEY
nconf.env('_');

// 1. Command-line arguments
// 2. Environment variables
// 3. A file located at '/settings.json'
nconf.argv()
    .env()
    .file({ file: 'conf/settings.json' });

module.exports = nconf;
