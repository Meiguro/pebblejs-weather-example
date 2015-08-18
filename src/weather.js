var ajax = require('ajax');

var Weather = module.exports;

Weather.city = 'Toronto,CA';

Weather.baseUrl = 'http://api.openweathermap.org/data/2.5';

Weather.dailyForecastUrl = function() {
  var query = ajax.formify({
    q: Weather.city,
    cnt: 7, // days
    units: 'metric',
  });
  return Weather.baseUrl + '/forecast/daily' + '?' + query;
};

Weather.dailyForecast = function(callback) {
};
