
import _ from 'lodash';

var cafeId = '56d63d8703c0dd89f1f9e218';

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

  .controller('LocationsController', ['$state', 'geoLoc', '$http', function($state, geoLoc, $http) {
    
    this.locations = [];
    this.loading = true;

    geoLoc.currentPosition().then((pos) => {

      var lat = pos.coords.latitude;
      var lon = pos.coords.longitude;

      $http.get(__API_URL__ + '/cafes?lat='+lat+'&lon='+lon).then((r) => {

        this.loading = false;
        this.locations = r.data;
      });

    });

    this.pick = (location) => {
      console.log('picking')
      console.log(location)
      cafeId = location._id;
      $state.go('coffees');
    }

  }])

  .controller('CoffeesController', ['$http', '$state', function($http, $state) {
    $http.get(__API_URL__ + '/menu').then((r) => {
      this.coffees = r.data;
    });

    this.selectCoffee = (name) => {
      $state.go('coffee', { name });
    }

    this.coffees = [];
  }])

  .controller('CoffeeController', ['orderService', '$state', function(orderService, $state) {

    this.orders = orderService.orders;

    this.name = $state.params.name;

    this.choices = [
      { size: 'small', price: 2.5, },
      { size: 'medium', price: 3, },
      { size: 'large', price: 3.5, },
      { size: 'grande', price: 4, },
    ];

    this.add = (drink) => {
      orderService.add({
        name: this.name,
        ...drink
      });

      $state.go('order');
    }
  }])

  .controller('CafeController', ['$http', function($http) {

    this.orders = [];
    this.loading = true;

    $http.get(__API_URL__ + '/cafe/'+cafeId+'/order').then((r) => {

      this.loading = false;
      this.orders = r.data;
    });

  }])

  .controller('OrderController', ['$http', 'orderService', function($http, orderService) {
    this.orders = orderService.orders;
    this.total = orderService.total;

    this.submit = () => {

      this.orders.map((o) => {

        $http.post(__API_URL__ + '/cafe/'+cafeId+'/order', o).then( (r) => {
          console.log(r);
        });
      })
    }
  }]);

export default app;
