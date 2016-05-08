const squel = require('squel').useFlavour('postgres');

// string -> string
// Creates select all unique violations for providen bbl
const all_violations = bbl => {
  return squel.select()
    .from('uniq_violations')
    .where('bbl = ?', bbl)
    .toParam();
}; 

module.exports = {
  all_violations: all_violations
};
