
import _ from 'lodash';

const app = angular.module('App', ['ui.router']);

app.

  factory('geoLoc', ['$q', '$window', function ($q, $window) {

    'use strict';

    return {
      currentPosition: function() {
        var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
          deferred.reject('Geolocation not supported.');
        } else {
          $window.navigator.geolocation.getCurrentPosition(
            function (position) {
              deferred.resolve(position);
            },
            function (err) {
              deferred.reject(err);
            }
          );
        }

        return deferred.promise;
      }
    };
  }])

  .controller('MainController', ['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$state = $state;
  }])

  .controller('LocationsController', ['geoLoc', '$http', function(geoLoc, $http) {
    
    this.locations = [];

    geoLoc.currentPosition().then(function(pos) {

      var lat = pos.coords.latitude;
      var lon = pos.coords.longitude;

      $http.get(__API_URL__ + '/cafes?lat='+lat+'&lon='+lon).then((r) => {

        this.locations = r.data;
      });

      self.loading = false;
    });

  }])

  .controller('CoffeesController', ['$http', function($http) {
    $http.get(__API_URL__ + '/menu').then((r) => {
      this.coffees = r.data;
    });
    
    this.coffees = [];
  }])

  .controller('CoffeeController', ['orderService', '$state', function(orderService, $state) {
    this.orders = orderService.orders;

    this.total = () => _.reduce(this.orders, (o, n) => {
      return o.price + n;
    }, 0);

    this.choices = [
      { size: 'small', price: 2.5, },
      { size: 'medium', price: 3, },
      { size: 'large', price: 3.5, },
      { size: 'grande', price: 4, },
    ];

    this.add = (drink) => {
      orderService.add({
        name: 'cappuccino',
        ...drink
      });

      $state.go('order');
    }
  }])

  .controller('CafeController', [function() {

  }])

  .controller('OrderController', ['orderService', function(orderService) {
    this.orders = orderService.orders
  }]);

export default app;
