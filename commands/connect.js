const { createSession } = require('../utils/walletConnect');

module.exports = async (ctx) => {
  try {
    const { uri } = await createSession();

    const encoded = encodeURIComponent(uri);
    const mobileLink = `https://metamask.app.link/wc?uri=${encoded}`;

    await ctx.replyWithMarkdown(`🔗 *Connect your wallet*\n\n🧠 *Mobile users:* [Click to connect](${mobileLink})\n\n💻 *Desktop users:* Copy this URI into your wallet:\n\`${uri}\``);
  } catch (err) {
    console.error('Connect error:', err);
    ctx.reply('⚠️ Failed to start wallet session');
  }
};
