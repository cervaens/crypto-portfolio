const portfolioRoutes = require("./portfolioRoutes");
const transactionRoutes = require("./transactionRoutes");
const userRoutes = require("./userRoutes");

const initializeRoutes = (app) => {
  app.use("/api/portfolio", portfolioRoutes);
  app.use("/api/transactions", transactionRoutes);
  app.use("/api/", userRoutes);
  app.use("/", function (req, res) {
    res.redirect(307, "/api-docs");
  });
};

module.exports = { initializeRoutes };
