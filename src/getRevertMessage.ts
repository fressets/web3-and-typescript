
async function getReason(txHash: any) {
    const getRevertReason = require('eth-revert-reason')
    const Web3 = require("web3");
    const web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"))
    const tx = await web3.eth.getTransaction(txHash)
    
    const res = await getRevertReason(txHash, "mainnet", undefined, web3);
    console.log(JSON.stringify(res))
}

getReason("0x581180a0f5b9adfb065d45daa5e5c8621cd288a056064a19e341473e0dd29c2f")
