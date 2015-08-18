var UI = require('ui');

var App = {};

App.init = function() {
  App.homeMenu = new UI.Menu({ fullscreen: true });

  App.showHomeLoading();

  App.homeMenu.show();
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

App.init();
