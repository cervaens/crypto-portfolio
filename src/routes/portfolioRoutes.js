// routes/portfolioRoutes.js
const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolioController");
const validationMiddleware = require("../middleware/validationMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Portfolio
 *   description: Portfolio management
 */

// Apply authentication middleware to all routes in this router
router.use(authMiddleware.authenticateUser);

/**
 * @swagger
 * /api/portfolio/add:
 *   post:
 *     summary: Add a new cryptocurrency to the portfolio
 *     tags: [Portfolio]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cryptoCurrencyName:
 *                 type: string
 *               quantity:
 *                 type: string
 *               decimals:
 *                 type: number
 *             required:
 *               - cryptoCurrencyName
 *               - quantity
 *     responses:
 *       201:
 *         description: Cryptocurrency added successfully
 *       400:
 *         description: Invalid input or insufficient balance
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/add",
  validationMiddleware.validateRequest,
  portfolioController.addToPortfolio
);

/**
 * @swagger
 * /api/portfolio/update:
 *   put:
 *     summary: Update the quantity of a cryptocurrency in the portfolio
 *     tags: [Portfolio]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cryptoCurrencyName:
 *                 type: string
 *               quantity:
 *                 type: string
 *             required:
 *               - cryptoCurrencyName
 *               - quantity
 *     responses:
 *       200:
 *         description: Cryptocurrency quantity updated successfully
 *       400:
 *         description: Invalid input or cryptocurrency not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/update",
  validationMiddleware.validateRequest,
  portfolioController.updatePortfolio
);

/**
 * @swagger
 * /api/portfolio/delete:
 *   delete:
 *     summary: Delete a cryptocurrency from the portfolio
 *     tags: [Portfolio]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cryptoCurrencyName:
 *                 type: string
 *             required:
 *               - cryptoCurrencyName
 *     responses:
 *       200:
 *         description: Cryptocurrency deleted successfully
 *       400:
 *         description: Invalid input or cryptocurrency not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/delete",
  validationMiddleware.validateRequest,
  portfolioController.deleteCryptocurrency
);

/**
 * @swagger
 * /api/portfolio/state:
 *   get:
 *     summary: Retrieve the current state of the portfolio
 *     tags: [Portfolio]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the current portfolio state
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/state", portfolioController.getPortfolio);

module.exports = router;
