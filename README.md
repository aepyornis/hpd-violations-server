# hpd-violations-server

Serves JSON from HPD's violation data.

### Uniq_violations table fields:

violationid - int
buildingid - int
registrationid - int
housenumber - int
streetname - text
apartment - text
zip - text
violationclass - 'A', 'B', 'C', 'I'
inspectiondate - date
originalcertifybydate - date
originalcorrectbydate - date
newcertifybydate - date
newcorrectbydate - date
certifieddate - date
currentstatusid - date
currentstatus - date
currentstatusdate - date
bbl - char(10)
lat - numeric
lng - numeric
records - int

### Routes
sends back json.

/bbl/:bbl/all -> all violations
/bbl/:bbl/open -> open violations


### config.js:

module.exports = {
  pg: {
    host: 'localhost',
    port: 5432,
    database: 'my_db_name',
    user: 'user_name',
    password: 'user_password'
  },
  app: {
    port: 8080
  }
};
