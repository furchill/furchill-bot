const walletMap = {}; // This should match where you're storing wallets

module.exports = async (ctx) => {
  const userId = ctx.from.id;
  const userWallet = walletMap[userId];

  if (!userWallet) {
    return ctx.reply(`⚠️ You need to /connect your wallet first.`);
  }

  // For now, we’ll use hardcoded tokens to keep it simple
  const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'; // ETH
  const FURCHILL_ADDRESS = 'YOUR_FURCHILL_TOKEN_ADDRESS_HERE'; // Replace this

  const amountEth = 0.01; // hardcoded for now (in ETH)

  // 1inch swap link format
  const swapUrl = `https://app.1inch.io/#/1/swap/${ETH_ADDRESS}/${FURCHILL_ADDRESS}?amount=${amountEth}&fromAddress=${userWallet}&slippage=1`;

  await ctx.reply(`🔁 Swap Link Ready!\nClick below to approve and sign the transaction:\n\n${swapUrl}`);
};
