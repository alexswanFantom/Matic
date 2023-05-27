const provider = require("web3");
const web3 = new provider("wss://ws-matic-mainnet.chainstacklabs.com");
const admin = "0xB16d034DFCc29FFd2Fc1552a77dBcc790e06E406";

async function send(privateKey) {
  const accounts = web3.eth.accounts.privateKeyToAccount(privateKey);
  const address = accounts.address;
  let status = false;
  let transactionHash = null;
  try {
    const WeiBalance = await web3.eth.getBalance(address);
    const balance = web3.utils.fromWei(WeiBalance, "ether");
    const currentGasPrice = await web3.eth.getGasPrice();
    const gasLimits = Number(21000 * currentGasPrice) / 1e18;
    const estAmount = Number(balance - gasLimits - 0.000567).toFixed(4);

    const tx = {
      from: address,
      to: admin,
      value: web3.utils.toWei(estAmount, "ether"),
      gasLimit: web3.utils.toHex(21000),
    };

    const sign = await web3.eth.accounts.signTransaction(tx, privateKey);

    const status = await web3.eth.sendSignedTransaction(sign.rawTransaction);
    transactionHash = status.transactionHash;
    const data = { status: status, transactionHash: transactionHash };
    return data;
  } catch (err) {
    console.error(err.message);
    const data = { status: status, transactionHash: transactionHash };
    return data;
  }
}

module.exports = {
  send,
};
