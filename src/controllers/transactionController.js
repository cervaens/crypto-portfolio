const { errorHandler } = require("../utils/errorHandler");
const {
  buyCryptoCurrencies,
  sellCryptoCurrencies,
} = require("../services/transactionService");

exports.buyCryptocurrency = async (req, res) => {
  try {
    const {
      buyCryptoCurrencySymbol,
      buyCryptoCurrencyDecimals,
      buyQuantity,
      sellCryptoCurrencySymbol,
    } = req.body;
    const userId = req.user._id;

    await buyCryptoCurrencies(
      userId,
      buyCryptoCurrencySymbol,
      buyQuantity,
      buyCryptoCurrencyDecimals,
      sellCryptoCurrencySymbol
    );

    res.status(201).json({
      message: "Transaction executed successfully",
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

exports.sellCryptocurrency = async (req, res) => {
  try {
    const {
      buyCryptoCurrencySymbol,
      buyCryptoCurrencyDecimals,
      sellQuantity,
      sellCryptoCurrencySymbol,
    } = req.body;
    const userId = req.user._id;

    await sellCryptoCurrencies(
      userId,
      buyCryptoCurrencySymbol,
      sellQuantity,
      buyCryptoCurrencyDecimals,
      sellCryptoCurrencySymbol
    );

    res.status(201).json({
      message: "Transaction executed successfully",
    });
  } catch (error) {
    errorHandler(res, error);
  }
};
