const chainlinkAggregatorABI = require("../abis/chainlinkAggregator.json");

const chainlinkDecimals = 8;
const { Web3 } = require("web3");
const web3 = new Web3(`https://${process.env.INFURA_HTTP_PROVIDER}`);

const getAggregatorAddressForToken = (tokenName) => {
  const tokenAddressMap = {
    ETH: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    MATIC: "0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676",
  };

  if (tokenName in tokenAddressMap) {
    return tokenAddressMap[tokenName];
  } else {
    throw new Error("Token not supported");
  }
};

const getTokenPrice = (tokenName) => {
  const tokenAggregatorAddress = getAggregatorAddressForToken(tokenName);
  const contract = new web3.eth.Contract(
    chainlinkAggregatorABI,
    tokenAggregatorAddress
  );

  return contract.methods.latestAnswer().call();
};

module.exports = {
  getAggregatorAddressForToken,
  chainlinkDecimals,
  getTokenPrice,
};
