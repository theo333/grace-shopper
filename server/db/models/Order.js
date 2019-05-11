const conn = require('../conn');
const { Sequelize } = conn;

// TODO - plan how to configure Order model to handle guest session (authenticated vs non-authenticated)

const Order = conn.define('order', {
  // from associations: userId
  type: {
    type: Sequelize.ENUM('pickup', 'delivery'),
  },
  subtotal: {
    type: Sequelize.FLOAT,
  },
  shipping: {
    type: Sequelize.FLOAT,
  },
  total: {
    type: Sequelize.FLOAT,
  },
  status: {
    type: Sequelize.ENUM(
      'cart',
      'processing',
      'on hold',
      'completed',
      'cancelled',
      'refunded',
      'failed',
    ),
  },
  date: {
    type: Sequelize.DATE,
  },
  // will probably want to include shipping address
  // payment info
});

Order.findOrCreateCart = function (userId) {
  return this.findAll({
    where: {
      userId: userId
    },
    // include: [{
    //   model: OrderItem,
    // }]
  })
  // .then(async (orders) => {
  //   let cart = orders.find(order => order.status === 'cart');
  //   if (cart) {
  //     return cart;
  //   }
  //   cart = await this.create({
  //     userId: userId
  //   });
  //   cart = await this.findByPk(cart.id, {
  //     include: [conn.OrderItem]
  //   });
  //   return cart;
  // })
};

module.exports = {
  Order,
}
