const app = angular.module('App', ['ui.router']);

app.controller('MainController', ['$rootScope', '$state', function($rootScope, $state) {
  $rootScope.$state = $state;
}])

export default app;
