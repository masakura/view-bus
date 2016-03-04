'use strict';

const jsdom = require('jsdom');

function get(html, number) {
  return new Promise(resolve => {
    jsdom.env(
      html,
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

class Route {
  constructor(loader) {
    this.loader = loader;
  }

  getRoute(number) {
    return this.loader()
      .then(html => get(html, number));
  }
}

module.exports = Route;
