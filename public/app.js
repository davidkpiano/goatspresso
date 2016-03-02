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

  .controller('CoffeesController', [function() {
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

  .controller('CoffeeController', ['orderService', function(orderService) {
    this.orders = orderService.orders;

    console.log(this.orders);

    this.choices = [
      { size: 'small', price: 2.5, },
      { size: 'medium', price: 3, },
      { size: 'large', price: 3.5, },
      { size: 'grande', price: 4, },
    ];

    this.add = (order) => {
      orderService.add({
        name: 'cappuccino',
        ...order
      });
    }
  }]);

export default app;
