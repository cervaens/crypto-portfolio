// routes/transactionRoutes.js
const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const validationMiddleware = require("../middleware/validationMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Cryptocurrency transactions
 */

// Apply authentication middleware to all routes in this router
router.use(authMiddleware.authenticateUser);

/**
 * @swagger
 * /api/transactions/buy:
 *   post:
 *     summary: Buy a cryptocurrency by simulating an ethers.js transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyCryptoCurrencySymbol:
 *                 type: string
 *               buyCryptoCurrencyDecimals:
 *                 type: string
 *               buyQuantity:
 *                 type: string
 *               sellCryptoCurrencySymbol:
 *                 type: string
 *             required:
 *               - buyCryptoCurrencySymbol
 *               - buyQuantity
 *               - sellCryptoCurrencySymbol
 *     responses:
 *       201:
 *         description: Cryptocurrency bought successfully
 *       400:
 *         description: Invalid input or insufficient balance
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/buy",
  validationMiddleware.validateBuyTransaction,
  transactionController.buyCryptocurrency
);

/**
 * @swagger
 * /api/transactions/sell:
 *   post:
 *     summary: Sell a cryptocurrency by simulating an ethers.js transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sellCryptoCurrencySymbol:
 *                 type: string
 *               sellQuantity:
 *                 type: string
 *               buyCryptoCurrencySymbol:
 *                 type: string
 *               buyCryptoCurrencyDecimals:
 *                 type: string
 *             required:
 *               - sellCryptoCurrencySymbol
 *               - sellQuantity
 *               - buyCryptoCurrencySymbol
 *     responses:
 *       201:
 *         description: Cryptocurrency sold successfully
 *       400:
 *         description: Invalid input or insufficient cryptocurrency quantity
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/sell",
  validationMiddleware.validateRequest,
  transactionController.sellCryptocurrency
);

module.exports = router;
