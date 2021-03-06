const query = require('../query');

describe('query generators', ()=>{

  describe('all_violations_query', ()=>{
    it('returns correct query', ()=>{
      let q = query.all_violations('1000');
      q.text.should.eql("SELECT * FROM all_violations WHERE (bbl = $1)");
      q.values.length.should.eql(1);
      q.values[0].should.eql('1000');
    });
  });
  
  describe('open_violations', ()=>{
    it('returns correct query', ()=>{
      let q = query.open_violations('1000');
      q.text.should.eql("SELECT * FROM all_violations WHERE (bbl = $1) AND (currentstatusid <> 19)");
      q.values.length.should.eql(1);
      q.values[0].should.eql('1000');
    });
  });

});
