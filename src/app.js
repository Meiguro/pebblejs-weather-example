var UI = require('ui');
var Weather = require('weather');

var App = {};

App.init = function() {
  App.homeMenu = new UI.Menu({ fullscreen: true });

  App.showDailyForecast();
};

App.showHomeLoading = function() {
  var sectionId = 0;
  App.homeMenu.section(sectionId, {
    title: 'Weather',
    items: [{
      title: 'Loading...'
    }],
  });
};

App.showDailyForecast = function() {
  App.showHomeLoading();

  Weather.dailyForecast(function(data) {
    console.log(data);
  });

  App.homeMenu.show();
};

App.init();
