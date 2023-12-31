// app.js
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const { initializeRoutes } = require("./routes");
const { errorHandler } = require("./utils/errorHandler");

const app = express();

// Middleware
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,POST,DELETE",
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per window
});
app.use(limiter);

// Swagger Configuration
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Crypto Portfolio API",
    version: "1.0.0",
    description: "API for managing cryptocurrency portfolios",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["src/routes/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Initialize Routes
initializeRoutes(app);

// Error Handling Middleware
app.use((err, req, res) => {
  errorHandler(res, err.message, err.status || 500);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
