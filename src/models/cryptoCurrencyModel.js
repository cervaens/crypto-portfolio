const mongoose = require("mongoose");

const cryptoCurrencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  decimals: {
    type: Number,
    required: true,
  },
});

const CryptoCurrency = mongoose.model("CryptoCurrency", cryptoCurrencySchema);

module.exports = CryptoCurrency;
