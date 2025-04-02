const axios = require('axios');

module.exports = async function getSwapQuote(fromToken, toToken, amountInWei, wallet) {
  try {
    const url = `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${amountInWei}&fromAddress=${wallet}&slippage=1&disableEstimate=false`;

    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error("1inch quote error:", err?.response?.data || err.message);
    return null;
  }
};
