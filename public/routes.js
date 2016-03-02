import app from './app';

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/start");

  $stateProvider
    .state('start', {
      url: "/",
      templateUrl: 'public/views/start-view.html'
    })

    .state('locations', {
      url: "/locations",
      templateUrl: "public/views/locations-view.html"
    })

    .state('coffees', {
      url: "/coffees",
      templateUrl: "public/views/coffees-view.html"
    })

    .state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
}]);
