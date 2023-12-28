# Crypto Portfolio API

This is a simple Node.js application for managing a cryptocurrency portfolio. It includes RESTful API endpoints for user registration, portfolio management, and simulated cryptocurrency transactions.

## Deployment with Docker Compose

To deploy the application using Docker Compose:

1.  Clone the repository:
    `git clone https://github.com/cervaens/crypto-portfolio.git`

2.  Change into the project directory:
    `cd crypto-portfolio-api`
3.  Create a \`.env\` file from file example.env and change the vars accordingly, although only an infura key is needed to add. All other vars can be kept as they are.

4.  Run Docker Compose:

    docker-compose up --build

The application will be accessible at [http://localhost:3000](http://localhost:3000).

### Notes

- An API key from infura is needed.

- The only supported tokens are MATIC and ETH. Others can be easily added.

- Chainlink aggregator is being used as price oracle. Prices are used to determine the amount of a token when buying/selling other tokens.

- Validation is done in one endpoint as an example, other endpoints should have validiotn in prod.

- tests are not in place but should be before deploying to prod.

- auth is a simple jwt that is replaced everytime there's a login. Passwords for login are open so https should be used in prod.

- cors and rate limitation are basically implemented.

- basic docker-compose was built.

## API Endpoints

### User Registration

**Endpoint:** POST /api/register

**Description:** Register a new user.

**Request Body:**

    {
      "username": "your-username",
      "password": "your-password"
    }

### User Login

**Endpoint:** POST /api/login

**Description:** Log in with a registered user.

**Request Body:**

    {
      "username": "your-username",
      "password": "your-password"
    }

**Response:**

    {
      "user": {
        "_id": "user-id",
        "username": "your-username"
      },
      "token": "your-jwt-token"
    }

### Portfolio Management

**Endpoint:** POST /api/portfolio/add

**Description:** Add a new entry to the portfolio.

**Request Body:**

    {
      "cryptoCurrencySymbol": "string",
      "quantity": "string",
      "decimals": 0
    }

**Endpoint:** POST /api/portfolio/delete

**Description:** Delete a new entry to the portfolio.

**Request Body:**

    {
    "cryptoCurrencySymbol": "string",
    }

**Endpoint:** POST /api/portfolio/update

**Description:** Update an entry in the portfolio.

**Request Body:**

    {
    "cryptoCurrencySymbol": "string",
    "quantity": "string"
    }

**Endpoint:** GET /api/portfolio/state

**Description:** Retrieve the current portfolio state.

### Simulated Cryptocurrency Transactions

**Endpoint:** POST /api/transaction/buy

**Description:** Simulate buying cryptocurrency.

**Request Body:**

    {
    "buyCryptoCurrencySymbol": "string",
    "buyCryptoCurrencyDecimals": "string",
    "buyQuantity": "string",
    "sellCryptoCurrencySymbol": "string"
    }

**Endpoint:** POST /api/transaction/sell

**Description:** Simulate selling cryptocurrency.

**Request Body:**

    {
    "sellCryptoCurrencySymbol": "string",
    "sellQuantity": "string",
    "buyCryptoCurrencySymbol": "string",
    "buyCryptoCurrencyDecimals": "string"
    }

### API Documentation

API documentation is available at /api-docs. For example, if running locally, visit:

    http://localhost:3000/api-docs

This documentation provides details on available endpoints, request bodies, and response formats.

### Contributing

Contributions are welcome! Please follow the Contributing Guidelines.

### License

This project is licensed under the MIT License.
