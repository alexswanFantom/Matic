const axios = require("axios");
let email = [
  "zonawallets@gmail.com",
  "hydrochaintoken@gmail.com",
  "kcuan35@gmail.com",
  "zonachaon@gmail.com",
  "ziddanalfarizy26@gmail.com",
  "eulisyuniarti2203@gmail.com",
  "lesmanaanjing@gmail.com",
  "acipsyaputraj@gmail.com",
  "iisyamhuri@gmail.com",
  "ziddanalfarizy12@gmail.com",
];

let address = "0x4bcabe941ba359a93926bd5b1555887d419573a4";

async function claim(email) {
  try {
    let url = "https://paxunitas.com/assets/api/api.php";
    let response = await axios.post(url, {
      func: "verifyUser",
      wallet: address,
      email: email,
    });

    if (response.data != null) {
      console.log(
        "\u001b[33m" +
          email +
          "\u001b[0m: \u001b[31m" +
          response.data.msg +
          "\u001b[0m"
      );
    }
  } catch (err) {
    console.error(err.message);
  }
}

async function main() {
  for (let i = 0; i < email.length; i++) {
    await claim(email[i]);
  }

  await main();
}

main();
