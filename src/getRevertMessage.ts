
async function getReason(txHash: any) {
    const getRevertReason = require('eth-revert-reason')
    const Web3 = require("web3");
    const web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"))
    const tx = await web3.eth.getTransaction(txHash)
    
    const res = await getRevertReason(txHash, "mainnet", undefined, web3);
    console.log(JSON.stringify(res))
}

getReason("0x176145e41ef855196038af36a7ca7c168613c63dbf1b31a163b0bad44c93ecdc")
