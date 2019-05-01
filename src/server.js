const express = require ('express');
const redis = require ('redis');
const debug = require ('debug');
const critical = debug ('app:error');
const info = debug ('app:info');

const app = express ();
const client = redis.createClient ({
  url: process.env.REDIS_URL,
  retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      critical ('The server refused the connection');
      return new Error ('The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      critical ('Retry time exhausted');
      return new Error ('Retry time exhausted');
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min (options.attempt * 100, 3000);
  },
});

client.on ('error', function (err) {
  critical ('REDIS_ERROR ' + err);
});

app.get ('/store/:key', (req, res) => {
  const {key} = req.params;
  const value = req.query;
  client.set (key, JSON.stringify (value));
  return res.status (201).send ('OK');
});

app.get ('/:key', (req, res) => {
  const {key} = req.params;
  client.get (key, (err, reply) => {
    if (reply == null) {
      return res.status (404).send ('Not found');
    } else {
      return res.json (JSON.parse (reply));
    }
  });
});

app.get ('/', (req, res) => {
  return res.send ('Hello world');
});

const PORT = process.env.PORT || 3000;
app.listen (PORT, () => {
  info (`Server listening on port ${PORT}`);
});
