const should = require('should');
const request = require('superagent');
const server = require('../server');

const url = 'localhost:8200';
before(done => server.listen(server.server, done));

describe('bbl/:bbl/all route', () =>{
  
  describe('BBL has at least one records', ()=>{
    let res;
    
    before(done => {
      request
        .get(url + '/bbl/1020350001/all')
        .end((err, responce) => {
          res = responce;
          done();
         });
    });
    
    it('contains an array with at least one violation', ()=> {
      res.body.should.be.an.Array();
      res.body.length.should.be.aboveOrEqual(1);
    });

    it('violation data with correct shape', () =>{
      let viol = res.body[0];
      let keys = ['registrationid','violationid','buildingid','housenumber','streetname','apartment','zip','violationclass','inspectiondate','originalcertifybydate','originalcorrectbydate','newcertifybydate','newcorrectbydate','certifieddate','currentstatusid','currentstatus','currentstatusdate','bbl','lat','lng','records'];
      viol.should.have.keys(keys);
      viol.bbl.should.eql('1020350001');
    });

  });
  
});


