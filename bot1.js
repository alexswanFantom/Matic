const axios = require("axios");
let url = "https://paxunitas.com/assets/api/api.php";

let json = {
  email: "zonawallets@gmail.com",
  func: "verifyUser",
  wallet: "0x4bcabe941ba359a93926bd5b1555887d419573a4",
};

async function main() {
  const res = await axios.post("https://paxunitas.com/assets/api/api.php", {
    func: "verifyUser",
    wallet: "0x4bcabe941ba359a93926bd5b1555887d419573a4",
    email: "kcuan35@gmail.com",
  });
  const res2 = await axios.post("https://paxunitas.com/assets/api/api.php", {
    func: "verifyUser",
    wallet: "0x4bcabe941ba359a93926bd5b1555887d419573a4",
    email: "zonawallets@gmail.com",
  });
  if (res.data === null) {
    await main();
  } else {
    console.log(res.data);
    console.log(res2.data);
    await main();
  }
}

main();
