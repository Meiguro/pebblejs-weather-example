var UI = require('ui');
var Vector2 = require('vector2');
var Weather = require('weather');
var moment = (window.moment || require('moment'));

var capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

var App = {};

App.iconMap = {
  '01d': 'images/sun-50.png',
  '01n': 'images/sun-50.png',
  '02d': 'images/partly-cloudy-50.png',
  '02n': 'images/partly-cloudy-50.png',
  '03d': 'images/cloudy-day-50.png',
  '03n': 'images/cloudy-day-50.png',
  '04d': 'images/cloudy-day-50.png',
  '04n': 'images/cloudy-day-50.png',
  '09d': 'images/light-rain-50.png',
  '09n': 'images/light-rain-50.png',
  '10d': 'images/heavy-rain-50.png',
  '10n': 'images/heavy-rain-50.png',
  '11d': 'images/heavy-rain-50.png',
  '11n': 'images/heavy-rain-50.png',
  '13d': 'images/heavy-snow-50.png',
  '13n': 'images/heavy-snow-50.png',
  '50d': 'images/cloudy-day-50.png',
  '50n': 'images/cloudy-day-50.png',
};

App.init = function() {
  App.homeMenu = new UI.Menu({
    fullscreen: true,
    highlightBackgroundColor: 'cobaltBlue',
  });

  App.initDayWindow();

  App.showDailyForecast();
};

App.initDayWindow = function() {
  var windowSize = new Vector2(144, 168);

  App.dayWindow = {};

  var wind = App.dayWindow.window = new UI.Window({
    fullscreen: true,
    backgroundColor: 'lightGray',
  });

  App.dayWindow.statusText = new UI.TimeText({
    position: new Vector2(0, 0),
    size: new Vector2(windowSize.x, 16),
    font: 'gothic-14',
    color: 'black',
    text: '%I:%M %p',
    textAlign: 'center',
  });

  App.dayWindow.dateText = new UI.Text({
    position: new Vector2(0, 20),
    size: new Vector2(windowSize.x, 20),
    font: 'gothic-18-bold',
    color: 'black',
    textAlign: 'center',
  });

  App.dayWindow.temperatureText = new UI.Text({
    position: new Vector2(0, 40),
    size: new Vector2(windowSize.x, 30),
    font: 'leco-26-bold-numbers-am-pm',
    color: 'black',
    textAlign: 'center',
  });

  App.dayWindow.weatherIcon = new UI.Image({
    position: new Vector2((windowSize.x - 25) / 2, 90),
    size: new Vector2(25, 25),
    image: 'images/partly-cloudy-50.png',
    compositing: 'set',
  });

  App.dayWindow.cityText = new UI.Text({
    position: new Vector2(0, 134),
    size: new Vector2(windowSize.x, 20),
    font: 'gothic-18-bold',
    color: 'black',
  });

  wind.add(App.dayWindow.statusText);
  wind.add(App.dayWindow.dateText);
  wind.add(App.dayWindow.temperatureText);
  wind.add(App.dayWindow.weatherIcon);
  wind.add(App.dayWindow.cityText);
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
  var dayDate = moment.unix(data.dt).format('ddd D');
  var title = data.weather[0].main;
  var subtitle = data.weather[0].description;
  var icon = App.iconMap[data.weather[0].icon];

  return {
    data: data,
    menuItem: {
      title: max + '°/' + min + '° ' + title,
      subtitle: dayDate + ' ' + subtitle,
    },
    dayWindow: {
      date: dayDate,
      temperature: max + '°/' + min + '°',
      city: forecast.city.name,
      icon: icon,
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
  App.dayWindow.dateText.text(model.dayWindow.date);
  App.dayWindow.temperatureText.text(model.dayWindow.temperature);
  App.dayWindow.weatherIcon.image(model.dayWindow.icon);
  App.dayWindow.cityText.text(model.dayWindow.city);

  App.dayWindow.window.show();
};

App.init();
