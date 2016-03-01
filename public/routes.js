import app from './app';

app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

  $urlRouterProvider.otherwise("/start");

  $stateProvider
    .state('start', {
      url: "/state1",
      templateUrl: "public/views/start-view.html"
    })

    .state('state1.list', {
      url: "/list",
      templateUrl: "partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
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
