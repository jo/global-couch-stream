/* global-couch-stream
 * (c) 2013 Johannes J. Schmidt
 */

var url = require('url');
var request = require('request').defaults({ json: true });
var es = require('event-stream');
var follow = require('follow');

module.exports = function(options) {
  if (typeof options === 'string') {
    options = {
      url: options
    };
  }

  return es.pipeline(
    request.get(url.resolve(options.url, '_all_dbs')),
    es.parse(),
    es.through(function(dbs) {
      var queue = this.queue;

      // TODO: limit concurrent connections
      dbs.forEach(function write(db) {
        follow(url.resolve(options.url, db), function(err, change) {
          queue({
            db: db,
            change: change
          });
        });
      });
    }, function end() {
      // TODO: GET http://127.0.0.1:5984/_db_updates?feed=continuous
    })
  );
};
