import Web3 from "web3";

async function main() {
    const Web3 = require("web3");
    const web3 = new Web3(new Web3.providers.HttpProvider("http://geth-eth-ropsten-01.do.fressets.netget"))
    web3.eth.getTransaction("0x14182008b3dd895382934633361577259fc9ca1e45ded107e5dccc5676e4c14b").then(console.log)
}

main()