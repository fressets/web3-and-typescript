import Common from "@ethereumjs/common";
import { Transaction } from "@ethereumjs/tx";

async function balanceOf() {
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
    const Web3 = require("web3");
    const web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"))
    const contract = new web3.eth.Contract(balanceOfABI, "0x0000000000000000000000000000000000000103")
    console.log(JSON.stringify(contract.events.allEvents()))
}

async function setManagerProxy() {

    const setManagerProxyAbi = [
        { "type": "function", "constant": false, "name": "setManagerProxy", "inputs": [{ "name": "ccmp", "type": "address" }], "outputs": [], "payable": false, "stateMutability": "nonpayable" },
    ]
    const Web3 = require("web3");
    const web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"))
    const contract = new web3.eth.Contract(setManagerProxyAbi, "0x0000000000000000000000000000000000000103")
    console.log(JSON.stringify(contract.events.allEvents()))
}

async function lock() {

    const lockAbi = [
        {
            "constant": false, "inputs": [
                { "internalType": "uint64", "name": "toChainId", "type": "uint64" },
                { "internalType": "bytes", "name": "toAddress", "type": "bytes" },
                { "internalType": "uint256", "name": "amount", "type": "uint256" }
            ], "name": "lock", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function"
        }
    ]
    const Web3 = require("web3");
    const web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"))
    const contract = new web3.eth.Contract(lockAbi, "0x0000000000000000000000000000000000000103")
    const chainId = 602 // onchainさんから伝えられたPolyChainID
    const toAddress = "0xA0b06BF06b3Df01E5a18ED72e35c5d4A898E2B3f" // sepoliaのアドレス
    const PRIVATE_KEY = Buffer.from("f22585c397340c73a05253897bc442d966e394ad77c3e085c2efdcf67186f11d", "hex") // 自分のメタマスク
    const amount = web3.utils.toWei('0.0002', 'ether') // 自分のメタマスクがすでにapproveしている額以下
    const txObject = {
        nonce: web3.utils.toHex(await web3.eth.getTransactionCount('0xCD985714a3A3c764dFE2c14f5B8a2480De3F3Bb4')),
        gasPrice: 0,
        gasLimit: 0,
        to: '0x0000000000000000000000000000000000000103',
        value: '0x00',
        data: contract.methods.lock(chainId, toAddress, amount).encodeABI()
    };
    const common = new Common({
        "chain": {
            "name": "quorum",
            "chainId": 200,
            "networkId": 200,
            "comment": "quorum private chain",
            "url": "http://127.0.0.1/",
            "genesis": "0x0000000000000000000000000000000000000000000000000000000000000000",
            "hardforks": [],
            "bootstrapNodes": []
        }
    })
    const tx = new Transaction(txObject, { common }).sign(PRIVATE_KEY);
    console.log(tx.toJSON())
    // Serialize the transaction and send it to the network
    const serializedTx = tx.serialize();
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .then((receipt: any) => {
            console.log('Lock transaction successful:', receipt);
        })
        .catch((error: any) => {
            console.error('Lock transaction failed:', error);
        });
}

lock()
