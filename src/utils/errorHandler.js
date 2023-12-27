// utils/errorHandler.js
const handleDuplicateKeyError = (res, error) => {
  if (
    error.code === 11000 &&
    error.keyPattern &&
    error.keyPattern.cryptoCurrencyId
  ) {
    res
      .status(400)
      .json({ error: "Crypto currency already exists in portfolio." });
  } else {
    // For other errors, return a generic message
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const errorHandler = (res, error) => {
  if (error?.name?.match("Mongo") && error?.code === 11000) {
    handleDuplicateKeyError(res, error);
  } else {
    // For other errors, return a generic message
    res.status(500).json({ error: error?.message });
  }
};

module.exports = {
  errorHandler,
};
