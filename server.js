const restify = require('restify');
const config = require('./config');
const c = require('./controllers');

const server = restify.createServer();

const listen = (server, cb) => {
  server.listen(config.app.port, () => {
    console.log('%s listening at %s', server.name, server.url);
    cb();
  });
};

server.get('/bbl/:bbl/all', c.bbl_all);

// listen(server, ()=>{});
module.exports = {
  server: server,
  listen: listen
};
