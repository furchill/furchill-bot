const axios = require('axios');

module.exports = async function getPrice() {
  try {
    const res = await axios.get('https://api.dexscreener.com/latest/dex/pairs/solana/REPLACE_WITH_PAIR_ID');
    const price = res.data.pair.priceUsd;
    return Number(price).toFixed(6);
  } catch (err) {
    console.error('Error fetching price:', err.message);
    return 'Price unavailable 🐾';
  }
};
