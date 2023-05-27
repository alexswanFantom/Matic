const token = "6247061995:AAEGqhq0bEw5EbYBuf4kffYGweH0aUfEV4g";
require("dotenv").config();
const teleBot = require("node-telegram-bot-api");
const bot = new teleBot(token, {
  polling: true,
});
const ethers = require("ethers");
const axios = require("axios");
const provider = require("web3");
const web3 = new provider("wss://ws-matic-mainnet.chainstacklabs.com");
const admin = "0xB16d034DFCc29FFd2Fc1552a77dBcc790e06E406";
const ID = 6196464189;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function createWallet() {
  const mnemonic = await ethers.utils.entropyToMnemonic(
    ethers.utils.randomBytes(16)
  );
  const wallet = new ethers.Wallet.fromMnemonic(mnemonic);
  const pharse = wallet.mnemonic.phrase;
  return wallet;
}

async function claim(wallet) {
  try {
    const res = await axios.post(
      "https://api.degenpirates.gg/user/faucet-gas",
      new URLSearchParams({
        account: wallet.address,
        network: "polygon",
      })
    );
    if (res.data) {
      const text =
        "Address: `" +
        wallet.address +
        "`\nPrivateKey: `" +
        wallet.privateKey +
        "`\nStatus: `" +
        res.data.status +
        "`\ntx_hash: [" +
        res.data.tx_hash +
        "](https://polygonscan.com/tx/" +
        res.data.tx_hash +
        ")";
      bot.sendMessage(ID, text, {
        disable_web_page_preview: true,
        parse_mode: "Markdown",
      });
      await sleep(7000);
      await main();
    }
  } catch (err) {
    console.error(err.message);
    await sleep(7000);
    await main();
  }
}

async function main() {
  const wallet = await createWallet();
  await claim(wallet);
}

main();
