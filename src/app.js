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

App.makeDayModel = function(data) {
  var min = Math.round(data.temp.min);
  var max = Math.round(data.temp.max);
  var dayDate = moment.unix(data.dt).format('ddd D');
  var title = data.weather[0].main;
  var subtitle = data.weather[0].description;

  return {
    data: data,
    title: max + '°/' + min + '° ' + title,
    subtitle: dayDate + ' ' + subtitle,
  };
};

App.showDailyForecast = function() {
  App.showHomeLoading();

  Weather.dailyForecast(function(forecast) {
    var items = [];

    forecast.list.forEach(function(data, i) {
      var model = App.makeDayModel(data);
      items.push({
        title: model.title,
        subtitle: model.subtitle,
      });
    });

    var sectionId = 0;
    App.homeMenu.items(sectionId, items);
  });

  App.homeMenu.show();
};

App.init();
