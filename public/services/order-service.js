import app from '../app';


app
  .service('orderService', [function() {
    this.orders = [];

    this.add = (drink) => {
      this.orders.push(drink);
    }
  }])
