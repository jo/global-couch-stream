var feed = require('..');
var es = require('event-stream');

es.pipeline(
  feed('http://localhost:5984'),
  es.stringify(),
  process.stdout
);
