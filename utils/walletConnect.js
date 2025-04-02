const SignClient = require('@walletconnect/sign-client').default;

let client;

async function initClient() {
  if (!client) {
    client = await SignClient.init({
      projectId: 'b2beb3c13cc21dfd6aca3182b5812d65',
      metadata: {
        name: "FurchillBot",
        description: "Telegram bot for $FURCHILL wallet connection",
        url: "https://furchill.com",
        icons: ["https://furchill.com/icon.png"]
      }
    });
  }
  return client;
}

async function createSession() {
  const client = await initClient();

  const { uri, approval } = await client.connect({
    requiredNamespaces: {
      eip155: {
        methods: ["eth_sendTransaction", "personal_sign"],
        chains: ["eip155:1"],
        events: ["accountsChanged", "chainChanged"]
      }
    }
  });

  return { uri, approval };
}

module.exports = { createSession };
