var UI = require('ui');
var Weather = require('weather');
var moment = require('moment');

var capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

var App = {};

App.init = function() {
  App.homeMenu = new UI.Menu({
    fullscreen: true,
    highlightBackgroundColor: 'cobaltBlue',
  });

  App.dayCard = new UI.Card({
    scrollable: true,
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

App.makeDayModel = function(data, forecast) {
  var min = data.temp.min.toFixed();
  var max = data.temp.max.toFixed();
  var cardMin = data.temp.min.toFixed(1);
  var cardMax = data.temp.max.toFixed(1);
  var dayDate = moment.unix(data.dt).format('ddd D');
  var title = data.weather[0].main;
  var subtitle = data.weather[0].description;

  return {
    data: data,
    menuItem: {
      title: max + '°/' + min + '° ' + title,
      subtitle: dayDate + ' ' + subtitle,
    },
    dayCard: {
      title: cardMax + '°/' + cardMin + '°',
      subtitle: dayDate,
      body: [
        forecast.city.name,
        capitalize(subtitle) + '.',
        'Humidity', data.humidity + '%',
        'Pressure', data.pressure + 'hPa',
        'Wind Speed', data.speed + 'm/s',
      ].join('\n'),
    },
  };
};

App.showDailyForecast = function() {
  App.showHomeLoading();

  Weather.dailyForecast(function(forecast) {
    var items = [];

    forecast.list.forEach(function(data, i) {
      var model = App.makeDayModel(data, forecast);
      items.push({
        title: model.menuItem.title,
        subtitle: model.menuItem.subtitle,
        select: function() {
          App.showDayCard(model);
        },
      });
    });

    var sectionId = 0;
    App.homeMenu.items(sectionId, items);
  });

  App.homeMenu.show();
};

App.showDayCard = function(model) {
  App.dayCard.prop(model.dayCard);

  App.dayCard.show();
};

App.init();
