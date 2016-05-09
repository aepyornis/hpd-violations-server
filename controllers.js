const pgp = require('pg-promise')();
const QueryResultError = pgp.errors.QueryResultError;
const config = require('./config');
const query = require('./query');

const db = pgp(config.pg); 

/**
If the query returns no rows, an custom error-json is returned. If another error occurs, the error is returned.
For info on QueryResultError codes see: http://vitaly-t.github.io/pg-promise/errors_queryResult.js.html
*/
const handle_error = err => (err instanceof QueryResultError) ? 
      {
        'error': err.code,
        'message': err.message
      } : 
      err;

// string -> function
// Returns route handler for the given queryType.
const db_query = queryType => {
  return (req,res,next) => {
    db.many(query[queryType](req.params.bbl))
      .then(data => res.json(data))
      .catch(err => res.send(handle_error(err)));
  };
};

const bbl_all = db_query('all_violations');
const bbl_open = db_query('open_violations');


module.exports = {
  bbl_all: bbl_all,
  bbl_open: bbl_open,
  handle_error: handle_error
};
