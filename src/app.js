var UI = require('ui');

var App = {};

App.init = function() {
  var homeMenu = new UI.Menu({ fullscreen: true });

  var sectionId = 0;
  homeMenu.section(sectionId, {
    title: 'Weather',
    items: [{
      title: 'Loading...'
    }],
  });

  homeMenu.show();
};

App.init();
