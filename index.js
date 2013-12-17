/* global-couch-stream
 * (c) 2013 Johannes J. Schmidt
 */

var url = require('url');
var util = require('util');
var es = require('event-stream');
var follow = require('follow');
var request = require('request').defaults({ json: true });

module.exports = function(options) {
  if (typeof options === 'string') {
    options = {
      url: options
    };
  }
  options.follow = options.follow || {};

  return es.pipeline(
    request.get(url.resolve(options.url, '_all_dbs')),
    es.parse(),
    es.through(function(dbs) {
      var queue = this.queue;

      // TODO: limit concurrent connections
      dbs.forEach(function write(db) {
        var opts = {
          db: url.resolve(options.url, db)
        };

        util._extend(opts, options.follow);

        follow(opts, function(err, change) {
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
