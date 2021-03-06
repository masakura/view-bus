'use strict';

const fs = require('fs');
const Iconv = require('iconv').Iconv;

function load() {
  const iconv = new Iconv('EUC-JP', 'UTF-8//TRANSLIT//IGNORE');

  const data = fs.readFileSync('./info.html');
  const html = iconv.convert(data).toString('utf8');

  return Promise.resolve(html);
}

module.exports = load;
