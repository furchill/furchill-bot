const getPrice = require('../utils/getPrice');

module.exports = async (ctx) => {
  const price = await getPrice();
  ctx.reply(`📈 Current $FURCHILL price: $${price}`);
};
