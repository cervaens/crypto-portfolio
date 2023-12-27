const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  quantity: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cryptoCurrencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CryptoCurrency",
    required: true,
  },
});

portfolioSchema.index({ userId: 1, cryptoCurrencyId: 1 }, { unique: true });

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
