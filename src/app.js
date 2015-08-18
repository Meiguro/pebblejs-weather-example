var UI = require('ui');
var Weather = require('weather');
var moment = require('moment');

var App = {};

App.init = function() {
  App.homeMenu = new UI.Menu({
    fullscreen: true,
    highlightBackgroundColor: 'cobaltBlue',
  });

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
    var items = [];

    data.list.forEach(function(day, i) {
      var min = Math.round(day.temp.min);
      var max = Math.round(day.temp.max);
      var dayDate = moment.unix(day.dt).format('ddd D');
      var title = day.weather[0].main;
      var description = day.weather[0].description;

      items.push({
        title: max + '°/' + min + '° ' + title,
        subtitle: dayDate + ' ' + description,
      });
    });

    var sectionId = 0;
    App.homeMenu.items(sectionId, items);
  });

  App.homeMenu.show();
};

App.init();
