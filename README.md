# hpd violations server

Serves JSON from HPD's violation data.

To build the database see: [aepyornis/hpd-violations](https://github.com/aepyornis/hpd-violations)

The web-client for this server: [aepyornis/hpd-violations-web](https://github.com/aepyornis/hpd-violations-web)

### fields returned:

```
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
novdescription - text
currentstatusid - date
currentstatus - date
currentstatusdate - date
bbl - char(10)
lat - numeric
lng - numeric
records - int
datasource - 'O' or 'R'
```

### Routes

/bbl/:bbl/all -> all violations

/bbl/:bbl/open -> open violations


### config.js:

``` json
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
```
