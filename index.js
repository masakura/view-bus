'use strict';

const fs = require('fs');
const load = require('./libs/load');
const Route = require('./libs/route');
var twilio = require('twilio');
var TwilioServer = require('twilio-server');
var config = JSON.stringify(fs.readFileSync('./config.json', 'utf-8'));

const route = new Route(load);

var server = new TwilioServer(config.twilio);
server.start();

server.receive(function(promise) {
  promise
    .then(server.twiml(function () {
    var resp = new twilio.TwimlResponse();
    resp.say('こんにちわ!', {language:'ja-JP'});
    resp.gather({
      finishOnKey: '*'
    }, function() {
      this.say('ルート番号を入力してください。', {language:'ja-JP'});
    });
    return resp.toString();
  }))
    .then(server.twiml(function (result) {
      const number = parseInt(result.Digits);
      return route.getRoute(number)
        .then(function (route) {
          var resp = new twilio.TwimlResponse();
          resp.say(route.name, {language:'ja-JP'});
          resp.say(route.information, {language:'ja-JP'});
          resp.hangup();
          return resp.toString();
        });
    }));
});

return;
route.getRoute(2)
  .then(console.log);
