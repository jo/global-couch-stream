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
1. Write tests with [tap](https://github.com/isaacs/node-tap)
2. Lint your code with `npm run jshint`
3. Run the tests with `npm test`

(c) 2013 Johannes J. Schmidt
