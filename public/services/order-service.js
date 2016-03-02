import app from '../app';


app
  .service('orderService', [function() {
    this.orders = [];

    this.add = (drink) => {
      this.orders.push(drink);
    };
    
    this.total = () => _.reduce(this.orders, (o, n) => {
      return o.price + n;
    }, 0);
  }])
