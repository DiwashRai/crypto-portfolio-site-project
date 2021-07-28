const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  tradeDate: {
    type: String,
  },
});

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
