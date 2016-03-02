
import _ from 'lodash';

const app = angular.module('App', ['ui.router']);

app
  .controller('MainController', ['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$state = $state;
  }])
  .controller('LocationsController', ['$http', function($http) {
    
    this.locations = [];

    $http.get(__API_URL__ + '/cafes').then((r) => {

      this.locations = r.data;
    });

  }])

  .controller('CoffeesController', ['$http', function($http) {
    $http.get(__API_URL__ + '/menu').then((r) => {
      console.log(r.data);
    });
    this.coffees = [
      'cappuccino',
      'cappuccino',
      'cappuccino',
      'cappuccino',
      'cappuccino',
      'cappuccino',
      'cappuccino',
      'cappuccino',
    ]
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
