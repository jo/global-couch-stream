var feed = require('..');
var es = require('event-stream');

es.pipeline(
  feed({
    url: 'http://localhost:5984',
    follow: {
      include_docs: true
    }
  }),
  es.stringify(),
  process.stdout
);
