module.exports = async (ctx) => {
  const userId = ctx.from.id;

  // TEMP: Use a fake link until full WalletConnect is wired
  const connectLink = `https://walletconnect.com`; // Replace later with actual link/QR generator

  await ctx.reply(`🔗 Connect your wallet, soldier 🪖:\n${connectLink}`);
};
