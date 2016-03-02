import app from '../app';


app
  .service('orderService', [function() {
    this.orders = [];

    this.total = 0;

    this.getTotal = () => this.total;

    this.add = (drink) => {
      this.orders.push(drink);
    };
  }])
