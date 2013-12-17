global-couch-stream
============
Readable changes feed stream from all databases.

Usage
-----
```js
var feed = require('global-couch-stream');
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
```

Contributing
------------
Lint your code with `npm run jshint`

(c) 2013 Johannes J. Schmidt
