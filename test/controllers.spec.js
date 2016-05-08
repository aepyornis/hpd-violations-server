const pgp = require('pg-promise')();
const {handle_error} = require('../controllers');

const db = pgp(require('../config').pg); 
after( () => pgp.end() );

describe('handle_error', () =>{

  it('returns json if given an QueryResultError', () =>{
    return db.many("select * from violations where bbl = 'NOT REAL'")
      .then()
      .catch( err => {
        let e = handle_error(err);
        e.error.should.eql(0);
        e.message.should.be.a.String();
      });
  });
  
  it('returns the error for any other type of error', ()=>{
    let e = new Error('Whooops!');
    handle_error(e).should.be.an.Error();
    handle_error(e).should.eql(e);
  });
});
