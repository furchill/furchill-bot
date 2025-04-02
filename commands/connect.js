const { createSession } = require('../utils/walletConnect');

// Temporary in-memory storage (you can switch to Firebase or Supabase later)
const walletMap = {};

module.exports = async (ctx) => {
  try {
    const { uri, approval } = await createSession();

    const encoded = encodeURIComponent(uri);
    const mobileLink = `https://metamask.app.link/wc?uri=${encoded}`;

    // Let the user connect first
    await ctx.replyWithMarkdown(`🔗 *Connect your wallet*\n\n🧠 *Mobile:* [Click here](${mobileLink})\n💻 *Desktop:* Scan in your wallet:\n\`${uri}\`\n\nI’ll be waiting... 👀`);

    // Wait for them to approve in their wallet
    const session = await approval();

    const userId = ctx.from.id;
    const address = session.namespaces.eip155.accounts[0].split(':')[2];

    // Save address in memory
    walletMap[userId] = address;

    await ctx.reply(`✅ Wallet connected!\nAddress: ${address}`);
  } catch (err) {
    console.error('Connect error:', err);
    ctx.reply('⚠️ Failed to connect wallet.');
  }
};
