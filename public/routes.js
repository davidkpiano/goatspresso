import app from './app';

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/start");

  $stateProvider
    .state('start', {
      url: "/start",
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

    .state('coffee', {
      url: "/coffee/:name",
      templateUrl: "public/views/coffee-view.html"
    })

    .state('order', {
      url: "/order",
      templateUrl: "public/views/order-view.html"
    })

    .state('cafe', {
      url: "/cafe",
      templateUrl: "public/views/cafe-view.html"
    })
}]);
