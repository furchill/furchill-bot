const walletMap = {};

function setWallet(userId, address) {
  walletMap[userId] = address;
}

function getWallet(userId) {
  return walletMap[userId];
}

module.exports = {
  setWallet,
  getWallet,
};
