'use strict';

const load = require('./libs/load');
const Route = require('./libs/route');

const route = new Route(load);

route.getRoute(10)
  .then(console.log);
