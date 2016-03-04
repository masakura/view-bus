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
        ['http://code.jquery.com/jquery.js'],
        (error, window) => {
          const $routes = window.$('td[width="180"]');
          const $route = $routes.eq(1);
          resolve({
            route: $route.text(),
            information: $route.next().next().text(),
          });
        });
    });
  }
}

module.exports = Route;
