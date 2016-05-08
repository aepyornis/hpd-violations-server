const should = require('should');

describe('sample test', () => {
  it('passes', () =>{
    'cat'.should.eql('cat');
  });
  it('fails', () =>{
    false.should.be.ok();
  });
});
