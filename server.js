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

server.use(restify.CORS());

server.get('/bbl/:bbl/all', c.bbl_all);
server.get('/bbl/:bbl/open', c.bbl_open);


listen(server, ()=>{});

module.exports = {
  server: server,
  listen: listen
};
