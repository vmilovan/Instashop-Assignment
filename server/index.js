const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const path = require('path');

require('dotenv').config();

const databaseUri = process.env.DB_URL; // DB_URI

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}
const config = {
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: './cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
  fileKey: process.env.FILE_KEY || '',
  // liveQuery: {
  //   classNames: ['DubaiLandmarks'], // List of classes to support for query subscriptions
  // },
};

const options = { allowInsecureHTTP: false };
const dashboard = new ParseDashboard(
  {
    apps: [
      {
        appId: process.env.APP_ID || 'myAppId',
        masterKey: process.env.MASTER_KEY || '',
        serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
        appName: 'DubaiLandmarks Dashboard',
      },
    ],
  },
  options
);
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

const app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/parse';
const api = new ParseServer(config);
app.use(mountPath, api);

app.use('/dashboard', dashboard);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('Welcome');
});

const port = process.env.SERVER_PORT || 1337;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
  console.log('Server running on port ' + port + '.');
});
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);

module.exports = {
  app,
  config,
};
