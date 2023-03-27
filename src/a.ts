

async function main() {
    const quorumjs = require("quorum-js");
    const Web3 = require("web3");
    const web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"))
    quorumjs.extend(web3)

    const amount = web3.utils.toWei('0.0002', 'ether')
    const fee = web3.utils.toWei('0.00001', 'ether')

    console.log(amount - fee)
}

main()
