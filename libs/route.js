'use strict';

const jsdom = require('jsdom');

class Route {
  constructor(loader) {
    this.loader = loader;
  }

  getRoute(number) {
    return new Promise(resolve => {
      jsdom.env(
        this.loader(),
        ['./jquery.js'],
        (error, window) => {
          const $routes = window.$('td[width="180"]');
          const $route = $routes.eq(number);
          resolve({
            name: $route.text(),
            information: $route.next().next().text().replace(/\n/g, ''),
          });
        });
    });
  }
}

module.exports = Route;
