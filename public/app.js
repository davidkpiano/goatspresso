const app = angular.module('App', ['ui.router']);

app
  .controller('MainController', ['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$state = $state;
  }])
  .controller('LocationsController', [function() {
    this.locations = [
      {
        name: 'Starbucks',
        distance: 1.3,
      },
      {
        name: 'Drunken Monkey',
        distance: 0.5,
      },
      {
        name: 'Downtown Credo',
        distance: 5.6,
      }
    ]
  }])

export default app;
