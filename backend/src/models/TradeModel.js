const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    tradeDate: {
      type: String,
      required: true,
      trim: true,
    },
    symbol: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    fee: {
      type: Number,
    },
    total: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

tradeSchema.pre('save', async function (next) {
  const trade = this;
  trade.total = trade.cost;
  if (trade.fee) trade.total += trade.fee;
  trade.price = trade.total / trade.quantity;

  next();
});

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
