
const converter = (logs: any[]) => {
    const BN = require("bn.js");
    const tokenEventPrc20TransferSignature = "0xbeabacc8ffedac16e9a60acdb2ca743d80c2ebb44977a93fa8e483c74d2b35a8";
    const tokenEventPrc20ApproveSignature = "0x5c52a5f2b86fd16be577188b5a83ef1165faddc00b137b10285f16162e17792a";
    return logs
        .filter((log) => log.topics && log.topics.length > 2)
        .map((log) => {
            const eventSig = log.topics[0];
            const source = `0x${log.topics[1].slice(26, 66)}`;
            const destination = `0x${log.topics[2].slice(26, 66)}`;
            const amount = new BN(log.data.replace("0x", ""), 16).toString();
            const { blockNumber, blockHash, transactionHash, transactionIndex, address, logIndex, removed } = log;
            return {
                blockNumber,
                transactionHash,
                transactionIndex,
                address,
                eventSig,
                source,
                destination,
                amount,
                logIndex,
                removed
            };
        })
        .filter((log) => 
        log.source =="0xcd985714a3a3c764dfe2c14f5b8a2480de3f3bb4"
        || log.destination == "0xcd985714a3a3c764dfe2c14f5b8a2480de3f3bb4"
        || log.source == "0x0000000000000000000000000000000000000103"
        || log.destination == "0x0000000000000000000000000000000000000103"
        || log.eventSig == tokenEventPrc20ApproveSignature
        )
}

const balanceOfABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
];

async function main() {
    const Web3 = require("web3");
    const web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"))
    const account = "0xCD985714a3A3c764dFE2c14f5B8a2480De3F3Bb4"
    const contract = new web3.eth.Contract(balanceOfABI, "0x0000000000000000000000000000000000000103")
    let result = await contract.methods.balanceOf(account).call();
    console.log(result);

    const n = await web3.eth.getTransactionCount(account, 'pending');
    console.log("n: " + n);
    let _nonce = await web3.eth.getTransactionCount(account)
    console.log("Nonce: " + _nonce);

    const fromBlock = 1900000;
    const toBlock = 1974041;
    const pastLogs = await web3.eth.getPastLogs({ fromBlock, toBlock, address: ["0x0000000000000000000000000000000000000103"], topics: [] });
    converter(pastLogs).forEach(row => {
        console.log(JSON.stringify(row));
    })
}

main();
