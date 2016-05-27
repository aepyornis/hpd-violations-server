const should = require('should');
const request = require('superagent');
const server = require('../server');

const req_setup = (bbl, end, cb) => request 
        .get(`localhost:8200/bbl/${bbl}/${end}`)
        .end((err, res) => cb(res));


before(done => server.listen(server.server, done));

describe('bbl/:bbl/all route', () =>{
  
  describe('If BBL has at least one records', ()=>{
    var res;
    
    before( done  => req_setup('1020350001', 'all', (responce) => {
      res = responce;
      done();
    }));

    it('contains an array with at least one violation', ()=> {
      res.body.should.be.an.Array();
      res.body.length.should.be.aboveOrEqual(1);
      should(res.body.error).be.undefined();
    });

    it('violation data with correct shape', () =>{
      let viol = res.body[0];
      let keys = ['registrationid','violationid','buildingid','housenumber','streetname','apartment','zip','violationclass','inspectiondate','originalcertifybydate','originalcorrectbydate','newcertifybydate','newcorrectbydate','certifieddate','currentstatusid','currentstatus','currentstatusdate','bbl','lat','lng','records', 'novdescription', 'datasource'];
      viol.should.have.keys(keys);
      viol.bbl.should.eql('1020350001');
    });

  });

  describe('If BBL is not in db', ()=>{
    var res;
    
    before( done  => req_setup('0123456789', 'all', (responce) => {
      res = responce;
      done();
    }));
    
    it('sends correct error message', ()=>{
      res.body.message.should.be.a.String();
      res.body.error.should.eql(0);
    });
  });
});

describe('bbl/:bbl/open', () =>{
  var res;
  before( done  => req_setup('1020350001', 'open', (responce) => {
    res = responce;
    done();
  }));
  
  it('contains an array with at least one violation', ()=> {
    res.body.should.be.an.Array();
    res.body.length.should.be.aboveOrEqual(1);
    should(res.body.error).be.undefined();
  });
  
  it('violation data with correct shape', () =>{
    let viol = res.body[0];
    let keys = ['registrationid','violationid','buildingid','housenumber','streetname','apartment','zip','violationclass','inspectiondate','originalcertifybydate','originalcorrectbydate','newcertifybydate','newcorrectbydate','certifieddate','currentstatusid','currentstatus','currentstatusdate','bbl','lat','lng','records', 'novdescription', 'datasource'];
    viol.should.have.keys(keys);
    viol.bbl.should.eql('1020350001');
  });
  
  it('contains no violations with status 19', ()=> {
    res.body.forEach( v => v.currentstatusid.should.not.eql(19) );
  });
});
