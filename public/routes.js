import app from './app';

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('', '/start');
  $urlRouterProvider.when('/', '/start');

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

    .state('coffee', {
      url: "/coffee",
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
