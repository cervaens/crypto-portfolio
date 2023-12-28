const CryptoCurrency = require("../models/cryptoCurrencyModel");
const Portfolio = require("../models/portfolioModel");
const Transaction = require("../models/transactionModel");
const { getTokenPrice } = require("./chainlinkService");

const buyCryptoCurrencies = async (
  userId,
  toTokenSymbol,
  quantity,
  toTokenDecimals,
  fromTokenSymbol
) => {
  try {
    const { toToken, fromToken } = await getSwapCurrenciesDetails(
      fromTokenSymbol,
      toTokenSymbol,
      toTokenDecimals
    );

    const { fromTokenPortfolio, toTokenPortfolio } =
      await getSwapPortfolioDetails(userId, fromToken, toToken);

    const decimalsDiff = toToken.decimals - fromToken.decimals;

    const fromQuantity = await getTokenBFromTokenA(
      toTokenSymbol,
      fromTokenSymbol,
      quantity
    );

    const fromQuantityFormatted = fromQuantity * BigInt(10 ** decimalsDiff);

    // If enough balance
    if (BigInt(fromTokenPortfolio.quantity) >= fromQuantityFormatted) {
      // Store new reduced value for token in portfolio
      fromTokenPortfolio.quantity =
        BigInt(fromTokenPortfolio.quantity) - fromQuantityFormatted;
      await fromTokenPortfolio.save();

      // Update or create aquired token in portfolio
      if (toTokenPortfolio) {
        toTokenPortfolio.quantity =
          BigInt(toTokenPortfolio.quantity) + BigInt(quantity);
        await toTokenPortfolio.save();
      } else {
        await Portfolio.create({
          userId,
          cryptoCurrencyId: toToken._id,
          quantity: toTokenPortfolio.quantity,
        });
      }

      // If all's good, create the transaction
      await Transaction.create({
        userId,
        cryptocurrencyId: toTokenPortfolio._id,
        type: "BUY",
        quantity: quantity,
      });
    } else {
      throw new Error("Not enough funds");
    }
  } catch (error) {
    throw new Error(`Error buying cryptocurrency. ${error?.message}`);
  }
};

const sellCryptoCurrencies = async (
  userId,
  toTokenSymbol,
  quantity,
  toTokenDecimals,
  fromTokenSymbol
) => {
  try {
    const { toToken, fromToken } = await getSwapCurrenciesDetails(
      fromTokenSymbol,
      toTokenSymbol,
      toTokenDecimals
    );

    const { fromTokenPortfolio, toTokenPortfolio } =
      await getSwapPortfolioDetails(userId, fromToken, toToken);

    const decimalsDiff = toToken.decimals - fromToken.decimals;

    const toQuantity = await getTokenBFromTokenA(
      fromTokenSymbol,
      toTokenSymbol,
      quantity
    );

    const toQuantityFormatted = toQuantity * BigInt(10 ** decimalsDiff);

    if (BigInt(fromTokenPortfolio.quantity) >= BigInt(quantity)) {
      // Store new reduced value for token in portfolio
      fromTokenPortfolio.quantity =
        BigInt(fromTokenPortfolio.quantity) - BigInt(quantity);
      await fromTokenPortfolio.save();

      // Update or create aquired token in portfolio
      if (toTokenPortfolio) {
        toTokenPortfolio.quantity =
          BigInt(toTokenPortfolio.quantity) + toQuantityFormatted;
        await toTokenPortfolio.save();
      } else {
        await Portfolio.create({
          userId,
          cryptoCurrencyId: toToken._id,
          quantity: toQuantityFormatted,
        });
      }

      // If all's good, create the transaction
      await Transaction.create({
        userId,
        cryptocurrencyId: fromTokenPortfolio._id,
        type: "SELL",
        quantity: quantity,
      });
    } else {
      throw new Error("Not enough funds");
    }
  } catch (error) {
    throw new Error(`Error selling cryptocurrency. ${error?.message}`);
  }
};

const fromTokenCurrencies = async (
  fromTokenSymbol,
  sellQuantity,
  toTokenSymbol
) => {
  try {
    return getTokenBFromTokenA(fromTokenSymbol, toTokenSymbol, sellQuantity);
  } catch (error) {
    throw new Error(`Error logging in. ${error?.message}`);
  }
};

async function getSwapCurrenciesDetails(
  fromTokenSymbol,
  toTokenSymbol,
  toTokenDecimals
) {
  let [fromToken, toToken] = await Promise.all([
    CryptoCurrency.findOne({ symbol: fromTokenSymbol }),
    CryptoCurrency.findOne({ symbol: toTokenSymbol }),
  ]);

  if (!fromToken) {
    throw new Error("Crypto currency not in portfolio");
  }

  if (!toToken) {
    const newCryptocurrency = new CryptoCurrency({
      symbol: toTokenSymbol,
      decimals: toTokenDecimals,
    });
    toToken = await newCryptocurrency.save();
  }
  return { toToken, fromToken };
}

async function getSwapPortfolioDetails(userId, fromToken, toToken) {
  const [fromTokenPortfolio, toTokenPortfolio] = await Promise.all([
    Portfolio.findOne({
      userId,
      cryptoCurrencyId: fromToken._id,
    }),
    Portfolio.findOne({
      userId,
      cryptoCurrencyId: toToken._id,
    }),
  ]);

  if (!fromTokenPortfolio) {
    throw new Error("Crypto currency not in portfolio");
  }
  return { toTokenPortfolio, fromTokenPortfolio };
}

const getTokenBFromTokenA = async (tokenA, tokenB, quantityA) => {
  const precision = BigInt(10 ** 18);
  const tokensRatio = await getRatioTokenATokenB(tokenA, tokenB, precision);
  return (tokensRatio * BigInt(quantityA)) / precision;
};

async function getRatioTokenATokenB(tokenA, tokenB, precision) {
  const [priceTokenA, priceTokenB] = await Promise.all([
    getTokenPrice(tokenA),
    getTokenPrice(tokenB),
  ]);
  return (priceTokenA * precision) / priceTokenB;
}

module.exports = {
  buyCryptoCurrencies,
  sellCryptoCurrencies,
  fromTokenCurrencies,
  getRatioTokenATokenB,
  getTokenBFromTokenA,
};
