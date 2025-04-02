const axios = require('axios');

module.exports = async function getPrice() {
  try {
    const res = await axios.get('https://api.geckoterminal.com/api/v2/networks/solana/tokens/YOUR_TOKEN_ADDRESS');
    const price = res.data.data.attributes.price_usd;
    return Number(price).toFixed(6);
  } catch (err) {
    return 'Error fetching price.';
  }
}
