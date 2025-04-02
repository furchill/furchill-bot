const getSwapQuote = require('../utils/getSwapQuote');
const { getWallet } = require('../utils/walletStore');

module.exports = async (ctx) => {
  const userId = ctx.from.id;
  const userWallet = getWallet(userId); // ✅ Use the shared function

  if (!userWallet) {
    return ctx.reply(`⚠️ You need to /connect your wallet first.`);
  }

  const messageParts = ctx.message.text.split(' ');
  const amountEth = parseFloat(messageParts[1]);

  if (!amountEth || isNaN(amountEth) || amountEth <= 0) {
    return ctx.reply(`❌ Please enter a valid ETH amount.\nExample: /swap 0.03`);
  }

  const fromToken = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'; // ETH
  const toToken = 'YOUR_FURCHILL_TOKEN_ADDRESS_HERE'; // Replace this!
  const amountInWei = (amountEth * 1e18).toFixed(0);

  const quote = await getSwapQuote(fromToken, toToken, amountInWei, userWallet);

  if (!quote) {
    return ctx.reply(`🚫 Could not fetch swap quote from 1inch. Try again later.`);
  }

  const outToken = quote.toToken.symbol;
  const outAmount = (quote.toTokenAmount / 10 ** quote.toToken.decimals).toFixed(2);
  const swapUrl = `https://app.1inch.io/#/1/swap/${fromToken}/${toToken}?amount=${amountInWei}&fromAddress=${userWallet}&slippage=1`;

  await ctx.replyWithMarkdown(
    `💸 *Estimated Output:* ${outAmount} ${outToken}\n\n` +
    `🔁 [Click to swap via 1inch](${swapUrl})\n\n` +
    `*From:* ${amountEth} ETH\n*To:* $FURCHILL\n\n` +
    `⚠️ Slippage: 1%`
  );
};
