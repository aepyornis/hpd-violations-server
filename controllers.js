const pgp = require('pg-promise')();
const QueryResultError = pgp.errors.QueryResultError;
const config = require('./config');
const query = require('./query');

const db = pgp(config.pg); 

/**
If the query returns no rows, then a json with error info is returned.
Otherwise, the error is sent, which triggers restify to send a 500 status code.
For info on QueryResultError codes see: http://vitaly-t.github.io/pg-promise/errors_queryResult.js.html
*/
const handle_error = err => (err instanceof QueryResultError) ? 
      {
        'error': err.code,
        'message': err.message
      } : 
      err;

const bbl_all = (req, res, next) => {
  db.many(query.all_violations(req.params.bbl))
    .then(data => res.json(data))
    .catch(err => res.send(handle_error(err)));
};

module.exports = {
  bbl_all: bbl_all,
  handle_error: handle_error
};
