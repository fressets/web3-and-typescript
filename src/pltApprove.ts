import Common from "@ethereumjs/common";
import { Transaction } from "@ethereumjs/tx";


// 自分のメタマスクアドレスからprc20tokenコントラクトへトランザクションを送信
// nativeContract.methods.approve(WRAPPER_CONTRACT_ADDR, approve_amount).encodeABI()を本データとして送信する
// ことで、WRAPPER_CONTRACT_ADDRが自分のメタマスクアドレスからapprove_amount分引き出すことを許可する
async function main() {
    const quorumjs = require("quorum-js");
    const Web3 = require("web3");
    const web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"))
    quorumjs.extend(web3)
    const WRAPPER_CONTRACT_ADDR = "0xdF539255E823b9D08aAD0b7D7b89868246f65B5a" // https://github.com/polynetwork/docs/blob/master/config/README_TestNet.md#BCS-Palette-2
    const NATIVE_ABI = [
        { "type": "function", "constant": true, "name": "transferOwnership", "inputs": [{ "name": "newOwner", "type": "address" }], "outputs": [{ "name": "succeed", "type": "bool" }] },
        { "type": "function", "constant": true, "name": "ownership", "inputs": [], "outputs": [{ "name": "owner", "type": "address" }] },
        { "type": "function", "constant": true, "name": "name", "inputs": [], "outputs": [{ "name": "_name", "type": "string" }], "payable": false, "stateMutability": "view" },
        { "type": "function", "constant": true, "name": "totalSupply", "inputs": [], "outputs": [{ "name": "_supply", "type": "uint256" }], "payable": false, "stateMutability": "view" },
        { "type": "function", "constant": true, "name": "decimals", "inputs": [], "outputs": [{ "name": "_decimal", "type": "uint256" }], "payable": false, "stateMutability": "view" },
        { "type": "function", "constant": true, "name": "symbol", "inputs": [], "outputs": [{ "name": "_symbol", "type": "string" }], "payable": false, "stateMutability": "view" },
        { "type": "function", "constant": false, "name": "approve", "inputs": [{ "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" }], "outputs": [{ "name": "_result", "type": "bool" }], "payable": false, "stateMutability": "nonpayable" },
        { "type": "function", "constant": false, "name": "transfer", "inputs": [{ "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "outputs": [{ "name": "_result", "type": "bool" }], "payable": false, "stateMutability": "nonpayable" },
        { "type": "function", "constant": false, "name": "mint", "inputs": [{ "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "outputs": [], "payable": false, "stateMutability": "nonpayable" },
        { "type": "function", "constant": false, "name": "burn", "inputs": [{ "name": "value", "type": "uint256" }], "outputs": [], "payable": false, "stateMutability": "nonpayable" },
        { "type": "function", "constant": false, "name": "bindAsset", "inputs": [{ "name": "chainId", "type": "uint64" }, { "name": "toAsset", "type": "bytes" }], "outputs": [{ "name": "_result", "type": "bool" }], "payable": false, "stateMutability": "nonpayable" },
        { "type": "function", "constant": true, "name": "getBindedAsset", "inputs": [{ "name": "chainId", "type": "uint64" }], "outputs": [{ "name": "asset", "type": "bytes" }], "payable": false, "stateMutability": "view" },
        { "type": "function", "constant": false, "name": "bindProxy", "inputs": [{ "name": "chainId", "type": "uint64" }, { "name": "proxy", "type": "bytes" }], "outputs": [{ "name": "_result", "type": "bool" }], "payable": false, "stateMutability": "nonpayable" },
        { "type": "function", "constant": true, "name": "getBindedProxy", "inputs": [{ "name": "chainId", "type": "uint64" }], "outputs": [{ "name": "proxy", "type": "bytes" }], "payable": false, "stateMutability": "view" },
        { "type": "function", "constant": false, "name": "transferFrom", "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "outputs": [{ "name": "_result", "type": "bool" }], "payable": false, "stateMutability": "nonpayable" },
        { "type": "function", "constant": true, "name": "balanceOf", "inputs": [{ "name": "owner", "type": "address" }], "outputs": [{ "name": "_balance", "type": "uint256" }], "payable": false, "stateMutability": "view" },
        { "type": "function", "constant": true, "name": "allowance", "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "outputs": [{ "name": "_value", "type": "uint256" }], "payable": false, "stateMutability": "view" },
        { "type": "function", "constant": false, "name": "setManagerProxy", "inputs": [{ "name": "ccmp", "type": "address" }], "outputs": [], "payable": false, "stateMutability": "nonpayable" },
        { "type": "function", "constant": true, "name": "getManagerProxy", "inputs": [], "outputs": [{ "name": "proxy", "type": "address" }], "payable": false, "stateMutability": "view" },
        { "constant": false, "inputs": [{ "internalType": "uint64", "name": "toChainId", "type": "uint64" }, { "internalType": "bytes", "name": "toAddress", "type": "bytes" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "lock", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" },
        { "constant": false, "inputs": [{ "internalType": "bytes", "name": "argsBs", "type": "bytes" }, { "internalType": "bytes", "name": "fromContract", "type": "bytes" }, { "internalType": "uint64", "name": "fromChainId", "type": "uint64" }], "name": "unlock", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" },
        { "type": "event", "anonymous": false, "name": "transferOwnership", "inputs": [{ "indexed": false, "name": "newOwner", "type": "address" }] },
        { "type": "event", "anonymous": false, "name": "transfer", "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }] },
        { "type": "event", "anonymous": false, "name": "bindAsset", "inputs": [{ "indexed": false, "name": "chainId", "type": "uint64" }, { "indexed": false, "name": "toAsset", "type": "bytes" }] },
        { "type": "event", "anonymous": false, "name": "bindProxy", "inputs": [{ "indexed": false, "name": "chainId", "type": "uint64" }, { "indexed": false, "name": "proxy", "type": "bytes" }] },
        { "type": "event", "anonymous": false, "name": "approval", "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }] },
        { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "fromAssetHash", "type": "address" }, { "indexed": false, "internalType": "address", "name": "fromAddress", "type": "address" }, { "indexed": false, "internalType": "uint64", "name": "toChainId", "type": "uint64" }, { "indexed": false, "internalType": "bytes", "name": "toAssetHash", "type": "bytes" }, { "indexed": false, "internalType": "bytes", "name": "toAddress", "type": "bytes" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "lock", "type": "event" },
        { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "toAssetHash", "type": "address" }, { "indexed": false, "internalType": "address", "name": "toAddress", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "unlock", "type": "event" }
    ] // どこを参照すればよいか不明
    const nativeContractAddress = "0x0000000000000000000000000000000000000103" // OK
    const nativeContract = new web3.eth.Contract(NATIVE_ABI, nativeContractAddress)
    const fromAccount = "0xCD985714a3A3c764dFE2c14f5B8a2480De3F3Bb4" // 自分のメタマスク
    const approve_amount = web3.utils.toWei('2.01', 'ether')
    let approveCode = await nativeContract.methods.approve(WRAPPER_CONTRACT_ADDR, approve_amount).encodeABI()
    let nonce;
    const PRIVATE_KEY = Buffer.from("f22585c397340c73a05253897bc442d966e394ad77c3e085c2efdcf67186f11d", "hex") // 自分のメタマスク
    web3.eth.getTransactionCount(fromAccount).then((_nonce: string | number) => {
        nonce = _nonce.toString(16);
        console.log("Nonce: " + _nonce);
        const common = new Common({
            "chain": {
                "name": "quorum",
                "chainId": 200, // BCS-Palette-2
                "networkId": 200, // BCS-Palette-2
                "comment": "quorum private chain",
                "url": "http://127.0.0.1/",
                "genesis": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "hardforks": [],
                "bootstrapNodes": []
            }
        })
        const txParams = {
            nonce: _nonce as number,
            gasPrice: 0, // 0がmust
            gasLimit: 0,
            from: fromAccount,
            value: 0, // PLTはchain通貨がないので0
            to: nativeContractAddress,
            data: approveCode
        };
        const tx = new Transaction(txParams, { common }).sign(PRIVATE_KEY);
        console.log("sign done.")
        console.log(tx.toJSON())
        const serializedTx = tx.serialize();
        console.log("approve sendSignedTransaction: 0x" + serializedTx.toString('hex'))
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
            .then((receipt: any) => {
                console.log('Transaction receipt:', receipt);
            })
            .catch((error: any) => {
                console.error('Error occurred:', error);
            });
    });
}
main()
