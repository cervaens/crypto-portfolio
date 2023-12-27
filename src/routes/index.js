const portfolioRoutes = require("./portfolioRoutes");
const transactionRoutes = require("./transactionRoutes");
const userRoutes = require("./userRoutes");

const initializeRoutes = (app) => {
  app.use("/api/portfolio", portfolioRoutes);
  // app.use("/api/transactions", transactionRoutes);
  app.use("/api/", userRoutes);
};

module.exports = { initializeRoutes };
