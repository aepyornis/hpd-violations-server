const query = require('../query');

describe('query generators', ()=>{

  describe('all_violations_query', ()=>{
    it('returns correct query', ()=>{
      let q = query.all_violations('1000');
      q.text.should.eql("SELECT * FROM uniq_violations WHERE (bbl = $1)");
      q.values.length.should.eql(1);
      q.values[0].should.eql('1000');
    });
  });

});
