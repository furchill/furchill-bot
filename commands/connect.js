const { createSession } = require('../utils/walletConnect');
const { setWallet } = require('../utils/walletStore');

module.exports = async (ctx) => {
  try {
    const { uri, approval } = await createSession();

    const encoded = encodeURIComponent(uri);
    const mobileLink = `https://metamask.app.link/wc?uri=${encoded}`;

    await ctx.replyWithMarkdown(
      `🔗 *Connect your wallet*\n\n🧠 [Mobile: Connect here](${mobileLink})\n💻 Or paste into your wallet:\n\`${uri}\`\n\nI'll wait... 🐾`
    );

    // Wait for wallet approval
    const session = await approval();
    const userId = ctx.from.id;

    const walletAddress = session.namespaces.eip155.accounts[0].split(':')[2]; // ✅ renamed from 'address'
    setWallet(userId, walletAddress);

    await ctx.reply(`✅ Wallet connected!\nAddress: ${walletAddress}`);
  } catch (err) {
    console.error('Connect error:', err);
    ctx.reply('⚠️ Failed to connect wallet.');
  }
};
