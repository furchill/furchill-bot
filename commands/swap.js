const walletMap = {}; // Replace this if you're storing wallets elsewhere

module.exports = async (ctx) => {
  const userId = ctx.from.id;
  const userWallet = walletMap[userId];

  if (!userWallet) {
    return ctx.reply(`⚠️ You need to /connect your wallet first.`);
  }

  const messageParts = ctx.message.text.split(' ');
  const amountEth = parseFloat(messageParts[1]);

  if (!amountEth || isNaN(amountEth) || amountEth <= 0) {
    return ctx.reply(`❌ Please provide a valid amount of ETH.\nExample: /swap 0.05`);
  }

  const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'; // ETH (native)
  const FURCHILL_ADDRESS = 'YOUR_FURCHILL_TOKEN_ADDRESS_HERE'; // Replace with actual ERC-20 token address

  const amountInWei = (amountEth * 1e18).toFixed(0); // Convert ETH to wei

  const swapUrl = `https://app.1inch.io/#/1/swap/${ETH_ADDRESS}/${FURCHILL_ADDRESS}?amount=${amountInWei}&fromAddress=${userWallet}&slippage=1`;

  await ctx.reply(`🔁 Here's your swap link:\n\n${swapUrl}`);
};
