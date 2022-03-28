import Web3 from "web3";
async function main() {
    const Web3 = require("web3");
    const Tx = require('ethereumjs-tx').Transaction;
    const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9986cb2f179c40ae8c5bf317ec2154ac"))
    const CONTRACT_ADDR = "0xD8aE73e06552E270340b63A8bcAbf9277a1aac99" // LockProxy contract on Ropsten
    const ABI = [
                                                               {
                                                                 "anonymous": false,
                                                                 "inputs": [
                                                                   {
                                                                     "indexed": false,
                                                                     "internalType": "address",
                                                                     "name": "fromAssetHash",
                                                                     "type": "address"
                                                                   },
                                                                   {
                                                                     "indexed": false,
                                                                     "internalType": "uint64",
                                                                     "name": "toChainId",
                                                                     "type": "uint64"
                                                                   },
                                                                   {
                                                                     "indexed": false,
                                                                     "internalType": "bytes",
                                                                     "name": "targetProxyHash",
                                                                     "type": "bytes"
                                                                   },
                                                                   {
                                                                     "indexed": false,
                                                                     "internalType": "uint256",
                                                                     "name": "initialAmount",
                                                                     "type": "uint256"
                                                                   }
                                                                 ],
                                                                 "name": "BindAssetEvent",
                                                                 "type": "event"
                                                               },
                                                               {
                                                                 "anonymous": false,
                                                                 "inputs": [
                                                                   {
                                                                     "indexed": false,
                                                                     "internalType": "uint64",
                                                                     "name": "toChainId",
                                                                     "type": "uint64"
                                                                   },
                                                                   {
                                                                     "indexed": false,
                                                                     "internalType": "bytes",
                                                                     "name": "targetProxyHash",
                                                                     "type": "bytes"
                                                                   }
                                                                 ],
                                                                 "name": "BindProxyEvent",
                                                                 "type": "event"
                                                               },
                                                               {
                                                                 "anonymous": false,
                                                                 "inputs": [
                                                                   {
                                                                     "indexed": false,
                                                                     "internalType": "address",
                                                                     "name": "fromAssetHash",
                                                                     "type": "address"
                                                                   },
                                                                   {
                                                                     "indexed": false,
                                                                     "internalType": "address",
                                                                     "name": "fromAddress",
                                                                     "type": "address"
                                                                   },
                                                                   {
                                                                     "indexed": false,
                                                                     "internalType": "uint64",
                                                                     "name": "toChainId",
                                                                     "type": "uint64"
                                                                   },
                                                                   {
                                                                     "indexed": false,
                                                                     "internalType": "bytes",
                                                                     "name": "toAssetHash",
                                                                     "type": "bytes"
                                                                   },
                                                                   {
                                                                     "indexed": false,
                                                                     "internalType": "bytes",
                                                                     "name": "toAddress",
                                                                     "type": "bytes"
                                                                   },
                                                                   {
                                                                     "indexed": false,
                                                                     "internalType": "uint256",
                                                                     "name": "amount",
                                                                     "type": "uint256"
                                                                   }
                                                                 ],
                                                                 "name": "LockEvent",
                                                                 "type": "event"
                                                               },
                                                               {
                                                                 "anonymous": false,
                                                                 "inputs": [
                                                                   {
                                                                     "indexed": true,
                                                                     "internalType": "address",
                                                                     "name": "previousOwner",
                                                                     "type": "address"
                                                                   },
                                                                   {
                                                                     "indexed": true,
                                                                     "internalType": "address",
                                                                     "name": "newOwner",
                                                                     "type": "address"
                                                                   }
                                                                 ],
                                                                 "name": "OwnershipTransferred",
                                                                 "type": "event"
                                                               },
                                                               {
                                                                 "anonymous": false,
                                                                 "inputs": [
                                                                   {
                                                                     "indexed": false,
                                                                     "internalType": "address",
                                                                     "name": "manager",
                                                                     "type": "address"
                                                                   }
                                                                 ],
                                                                 "name": "SetManagerProxyEvent",
                                                                 "type": "event"
                                                               },
                                                               {
                                                                 "anonymous": false,
                                                                 "inputs": [
                                                                   {
                                                                     "indexed": false,
                                                                     "internalType": "address",
                                                                     "name": "toAssetHash",
                                                                     "type": "address"
                                                                   },
                                                                   {
                                                                     "indexed": false,
                                                                     "internalType": "address",
                                                                     "name": "toAddress",
                                                                     "type": "address"
                                                                   },
                                                                   {
                                                                     "indexed": false,
                                                                     "internalType": "uint256",
                                                                     "name": "amount",
                                                                     "type": "uint256"
                                                                   }
                                                                 ],
                                                                 "name": "UnlockEvent",
                                                                 "type": "event"
                                                               },
                                                               {
                                                                 "constant": true,
                                                                 "inputs": [
                                                                   {
                                                                     "internalType": "address",
                                                                     "name": "",
                                                                     "type": "address"
                                                                   },
                                                                   {
                                                                     "internalType": "uint64",
                                                                     "name": "",
                                                                     "type": "uint64"
                                                                   }
                                                                 ],
                                                                 "name": "assetHashMap",
                                                                 "outputs": [
                                                                   {
                                                                     "internalType": "bytes",
                                                                     "name": "",
                                                                     "type": "bytes"
                                                                   }
                                                                 ],
                                                                 "payable": false,
                                                                 "stateMutability": "view",
                                                                 "type": "function"
                                                               },
                                                               {
                                                                 "constant": true,
                                                                 "inputs": [],
                                                                 "name": "isOwner",
                                                                 "outputs": [
                                                                   {
                                                                     "internalType": "bool",
                                                                     "name": "",
                                                                     "type": "bool"
                                                                   }
                                                                 ],
                                                                 "payable": false,
                                                                 "stateMutability": "view",
                                                                 "type": "function"
                                                               },
                                                               {
                                                                 "constant": true,
                                                                 "inputs": [],
                                                                 "name": "managerProxyContract",
                                                                 "outputs": [
                                                                   {
                                                                     "internalType": "address",
                                                                     "name": "",
                                                                     "type": "address"
                                                                   }
                                                                 ],
                                                                 "payable": false,
                                                                 "stateMutability": "view",
                                                                 "type": "function"
                                                               },
                                                               {
                                                                 "constant": true,
                                                                 "inputs": [],
                                                                 "name": "owner",
                                                                 "outputs": [
                                                                   {
                                                                     "internalType": "address",
                                                                     "name": "",
                                                                     "type": "address"
                                                                   }
                                                                 ],
                                                                 "payable": false,
                                                                 "stateMutability": "view",
                                                                 "type": "function"
                                                               },
                                                               {
                                                                 "constant": true,
                                                                 "inputs": [
                                                                   {
                                                                     "internalType": "uint64",
                                                                     "name": "",
                                                                     "type": "uint64"
                                                                   }
                                                                 ],
                                                                 "name": "proxyHashMap",
                                                                 "outputs": [
                                                                   {
                                                                     "internalType": "bytes",
                                                                     "name": "",
                                                                     "type": "bytes"
                                                                   }
                                                                 ],
                                                                 "payable": false,
                                                                 "stateMutability": "view",
                                                                 "type": "function"
                                                               },
                                                               {
                                                                 "constant": false,
                                                                 "inputs": [],
                                                                 "name": "renounceOwnership",
                                                                 "outputs": [],
                                                                 "payable": false,
                                                                 "stateMutability": "nonpayable",
                                                                 "type": "function"
                                                               },
                                                               {
                                                                 "constant": false,
                                                                 "inputs": [
                                                                   {
                                                                     "internalType": "address",
                                                                     "name": "newOwner",
                                                                     "type": "address"
                                                                   }
                                                                 ],
                                                                 "name": "transferOwnership",
                                                                 "outputs": [],
                                                                 "payable": false,
                                                                 "stateMutability": "nonpayable",
                                                                 "type": "function"
                                                               },
                                                               {
                                                                 "constant": false,
                                                                 "inputs": [
                                                                   {
                                                                     "internalType": "address",
                                                                     "name": "ethCCMProxyAddr",
                                                                     "type": "address"
                                                                   }
                                                                 ],
                                                                 "name": "setManagerProxy",
                                                                 "outputs": [],
                                                                 "payable": false,
                                                                 "stateMutability": "nonpayable",
                                                                 "type": "function"
                                                               },
                                                               {
                                                                 "constant": false,
                                                                 "inputs": [
                                                                   {
                                                                     "internalType": "uint64",
                                                                     "name": "toChainId",
                                                                     "type": "uint64"
                                                                   },
                                                                   {
                                                                     "internalType": "bytes",
                                                                     "name": "targetProxyHash",
                                                                     "type": "bytes"
                                                                   }
                                                                 ],
                                                                 "name": "bindProxyHash",
                                                                 "outputs": [
                                                                   {
                                                                     "internalType": "bool",
                                                                     "name": "",
                                                                     "type": "bool"
                                                                   }
                                                                 ],
                                                                 "payable": false,
                                                                 "stateMutability": "nonpayable",
                                                                 "type": "function"
                                                               },
                                                               {
                                                                 "constant": false,
                                                                 "inputs": [
                                                                   {
                                                                     "internalType": "address",
                                                                     "name": "fromAssetHash",
                                                                     "type": "address"
                                                                   },
                                                                   {
                                                                     "internalType": "uint64",
                                                                     "name": "toChainId",
                                                                     "type": "uint64"
                                                                   },
                                                                   {
                                                                     "internalType": "bytes",
                                                                     "name": "toAssetHash",
                                                                     "type": "bytes"
                                                                   }
                                                                 ],
                                                                 "name": "bindAssetHash",
                                                                 "outputs": [
                                                                   {
                                                                     "internalType": "bool",
                                                                     "name": "",
                                                                     "type": "bool"
                                                                   }
                                                                 ],
                                                                 "payable": false,
                                                                 "stateMutability": "nonpayable",
                                                                 "type": "function"
                                                               },
                                                               {
                                                                 "constant": false,
                                                                 "inputs": [
                                                                   {
                                                                     "internalType": "address",
                                                                     "name": "fromAssetHash",
                                                                     "type": "address"
                                                                   },
                                                                   {
                                                                     "internalType": "uint64",
                                                                     "name": "toChainId",
                                                                     "type": "uint64"
                                                                   },
                                                                   {
                                                                     "internalType": "bytes",
                                                                     "name": "toAddress",
                                                                     "type": "bytes"
                                                                   },
                                                                   {
                                                                     "internalType": "uint256",
                                                                     "name": "amount",
                                                                     "type": "uint256"
                                                                   }
                                                                 ],
                                                                 "name": "lock",
                                                                 "outputs": [
                                                                   {
                                                                     "internalType": "bool",
                                                                     "name": "",
                                                                     "type": "bool"
                                                                   }
                                                                 ],
                                                                 "payable": true,
                                                                 "stateMutability": "payable",
                                                                 "type": "function"
                                                               },
                                                               {
                                                                 "constant": false,
                                                                 "inputs": [
                                                                   {
                                                                     "internalType": "bytes",
                                                                     "name": "argsBs",
                                                                     "type": "bytes"
                                                                   },
                                                                   {
                                                                     "internalType": "bytes",
                                                                     "name": "fromContractAddr",
                                                                     "type": "bytes"
                                                                   },
                                                                   {
                                                                     "internalType": "uint64",
                                                                     "name": "fromChainId",
                                                                     "type": "uint64"
                                                                   }
                                                                 ],
                                                                 "name": "unlock",
                                                                 "outputs": [
                                                                   {
                                                                     "internalType": "bool",
                                                                     "name": "",
                                                                     "type": "bool"
                                                                   }
                                                                 ],
                                                                 "payable": false,
                                                                 "stateMutability": "nonpayable",
                                                                 "type": "function"
                                                               },
                                                               {
                                                                 "constant": true,
                                                                 "inputs": [
                                                                   {
                                                                     "internalType": "address",
                                                                     "name": "fromAssetHash",
                                                                     "type": "address"
                                                                   }
                                                                 ],
                                                                 "name": "getBalanceFor",
                                                                 "outputs": [
                                                                   {
                                                                     "internalType": "uint256",
                                                                     "name": "",
                                                                     "type": "uint256"
                                                                   }
                                                                 ],
                                                                 "payable": false,
                                                                 "stateMutability": "view",
                                                                 "type": "function"
                                                               }
                                                             ]
    const PRIVATE_KEY = Buffer.from("e9bac022a4a1f6d43810955750f896b7b0990eb24c49e338032e8003e37347a4", "hex")
    const account = "0x5b7fb1c0f7713e030c29b41551ea4574b9146fb7"
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDR);
    // ont: ASQa8m9nDuNB4HYbbTt5rN294taNykMhRk
    // neo: NSmjzJoqShD38aRu2m5zS3TMBXx4HMYUf3
    const bytes = "0x4a26aa47a9bbaf1367f9df5d6fc84b23230f445c"
    // ropsten: 0x0000000000000000000000000000000000000000, ontChainId: 3, neo3ChainId: 88
    let method = contract.methods.lock("0x4214ad91B47846Eb8ECCb1BD213F0d1f5Ea44262", 1001, bytes, 1)
    let code = await method.encodeABI()
    console.log('code=' + code)

    let nonce;

    	web3.eth.getTransactionCount(account).then(_nonce => {
    		nonce = _nonce.toString(16);
    		console.log("Nonce: " + nonce);

    		const txParams = {
    			nonce: '0x' + nonce,
    			gasPrice: web3.utils.toHex(web3.utils.toWei('110', 'gwei')),
    			gasLimit: web3.utils.toHex(500000),
    			value: web3.utils.toHex(web3.utils.toWei("0", "wei")),
    			from: account,
    			to: CONTRACT_ADDR,
    			data: code
    			};

    		const tx = new Tx(txParams, {chain: "ropsten", hardfork: "petersburg"});
    		tx.sign(PRIVATE_KEY);
    		console.log("sign done.")

    		const serializedTx = tx.serialize();

    		web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
    			console.log(receipt);
    			})
    		});

/*
    const tx = {
            nonce: 33,
            chainId: 3,
            from: "0x5b7fb1c0f7713e030c29b41551ea4574b9146fb7",
            to: CONTRACT_ADDR,
            value: '0',
            data: code,
        };
    signtx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    console.log('signed_tx=' + signtx.rawTransaction)

    console.log("send query")

    await contract.methods.lock().send({"from": "0x5B7fB1C0f7713e030C29B41551eA4574b9146fB7"}).then(result => console.log(result))
    */
}


main()