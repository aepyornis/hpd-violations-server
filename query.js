const squel = require('squel').useFlavour('postgres');

// string -> string
// Creates select all unique violations for providen bbl
const all_violations = bbl => {
  return squel.select()
    .from('uniq_violations')
    .where('bbl = ?', bbl)
    .toParam();
}; 

const open_violations = bbl => {
  return squel.select()
    .from('uniq_violations')
    .where('bbl = ?', bbl)
    .where('currentstatusid <> 19')
    .toParam();
}; 

module.exports = {
  all_violations: all_violations,
  open_violations: open_violations
};
