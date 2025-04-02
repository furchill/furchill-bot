const { createSession } = require('../utils/walletConnect');

module.exports = async (ctx) => {
  try {
    const { uri } = await createSession();

    // Deep link for mobile users
    const mobileLink = `https://walletconnect.com/wc?uri=${encodeURIComponent(uri)}`;

    await ctx.reply(`🔗 Connect your wallet:\n\n🧠 Mobile: [Open Wallet](${mobileLink})\n\n💻 Desktop: Scan this QR:\n\n${uri}`, {
      parse_mode: 'Markdown'
    });
  } catch (err) {
    console.error('Connect error:', err);
    ctx.reply('⚠️ Failed to start wallet session');
  }
};
