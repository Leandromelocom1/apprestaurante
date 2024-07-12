const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
