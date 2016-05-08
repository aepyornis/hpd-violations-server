const pgp = require('pg-promise')();
const QueryResultError = pgp.errors.QueryResultError;
const config = require('./config');
const query = require('./query');

const db = pgp(config.pg); 

const handle_error = err => {
  
};

const bbl_all = (req, res, next) => {
  db.many(query.all_violations(req.params.bbl))
    .then(data => res.json(data))
    .catch(err => res.json({'error': err}));
};

module.exports = {
  bbl_all: bbl_all
};
