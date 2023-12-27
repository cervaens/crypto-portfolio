// services/portfolioService.js
const Portfolio = require("../models/portfolioModel");
const Cryptocurrency = require("../models/cryptoCurrencyModel");

const addPortfolioEntry = async (
  userId,
  cryptoCurrencyName,
  quantity,
  decimals = 0
) => {
  try {
    let cryptocurrency = await Cryptocurrency.findOne({
      cryptoCurrencyName,
    });

    if (!cryptocurrency) {
      const newCryptocurrency = new Cryptocurrency({
        name: cryptoCurrencyName,
        decimals,
      });
      cryptocurrency = await newCryptocurrency.save();
    }

    const portfolioEntry = new Portfolio({
      cryptoCurrencyId: cryptocurrency._id,
      userId,
      quantity,
    });
    return portfolioEntry.save();
  } catch (error) {
    throw new Error(`Error adding portfolio entry ${error?.message}`);
  }
};

const updatePortfolioEntry = async (userId, cryptoCurrencyName, quantity) => {
  try {
    const cryptoCurrency = await Cryptocurrency.findOne({
      name: cryptoCurrencyName,
    });

    if (!cryptoCurrency) {
      throw new Error("CryptoCurrency not found in portfolio");
    }

    return Portfolio.updateOne(
      {
        cryptoCurrencyId: cryptoCurrency._id,
        userId,
      },
      {
        quantity,
      }
    );
  } catch (error) {
    throw new Error(`Error updating portfolio entry. ${error?.message}`);
  }
};

const deletePortfolioEntry = async (userId, cryptoCurrencyName) => {
  try {
    const cryptoCurrency = await Cryptocurrency.findOne({
      name: cryptoCurrencyName,
    });

    if (!cryptoCurrency) {
      throw new Error("CryptoCurrency not found in portfolio");
    }

    return Portfolio.deleteOne({
      cryptoCurrencyId: cryptoCurrency._id,
      userId,
    });
  } catch (error) {
    throw new Error(`Error deleting portfolio entry. ${error?.message}`);
  }
};

const getPortfolio = async (userId) => {
  try {
    return Portfolio.aggregate([
      { $match: { userId } },

      {
        $lookup: {
          from: "cryptocurrencies",
          localField: "cryptoCurrencyId",
          foreignField: "_id",
          as: "cryptocurrencies",
        },
      },
      { $unwind: "$cryptocurrencies" },
      {
        $project: {
          _id: 0,
          cryptocurrencyName: "$cryptocurrencies.name",
          quantity: 1,
          cryptocurrencyDecimals: "$cryptocurrencies.decimals",
        },
      },
    ]);
  } catch (error) {
    throw new Error(`Error getting portfolio entry ${error}`);
  }
};

module.exports = {
  addPortfolioEntry,
  updatePortfolioEntry,
  deletePortfolioEntry,
  getPortfolio,
};
