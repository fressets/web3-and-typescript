async function main() {
    const Web3 = require("web3");
    const web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"))
    const approve = `Transfer(address,address,unit256)`
    console.log(web3.utils.keccak256(approve))
}
main()
