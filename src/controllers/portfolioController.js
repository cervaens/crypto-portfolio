// controllers/portfolioController.js
const { errorHandler } = require("../utils/errorHandler");
const {
  addPortfolioEntry,
  updatePortfolioEntry,
  deletePortfolioEntry,
  getPortfolio,
} = require("../services/portfolioService");

exports.addToPortfolio = async (req, res) => {
  try {
    const { cryptoCurrencySymbol, quantity, decimals } = req.body;
    const userId = req.user._id;

    const updatedPortfolio = await addPortfolioEntry(
      userId,
      cryptoCurrencySymbol,
      quantity,
      decimals
    );

    res.status(201).json({
      message: "Portfolio entry added successfully",
      user: updatedPortfolio,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    const { cryptoCurrencySymbol, quantity } = req.body;
    const userId = req.user._id;

    const updatedPortfolio = await updatePortfolioEntry(
      userId,
      cryptoCurrencySymbol,
      quantity
    );

    res.status(201).json({
      message: "Portfolio entry updated successfully",
      user: updatedPortfolio,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

exports.deleteCryptocurrency = async (req, res) => {
  try {
    const { cryptoCurrencySymbol } = req.body;
    const userId = req.user._id;

    const updatedPortfolio = await deletePortfolioEntry(
      userId,
      cryptoCurrencySymbol
    );

    res.status(201).json({
      message: "Portfolio entry updated successfully",
      user: updatedPortfolio,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const userId = req.user._id;

    const portfolio = await getPortfolio(userId);

    res.status(201).json({
      portfolio,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};
