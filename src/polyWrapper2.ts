import Web3 from "web3";
import Common from "@ethereumjs/common";
import BN = require("bn.js");
const quorumjs = require("quorum-js");
async function main() {
    const Web3 = require("web3");
    const Tx = require('ethereumjs-tx').Transaction;
    const Ont = require('ontology-ts-sdk')
    const web3 = new Web3(new Web3.providers.HttpProvider("http://18.220.17.201:2200"))
    quorumjs.extend(web3)
    const CONTRACT_ADDR = "0x0c5c0b03e897e7b1828f2bc923ea4498ec891060" // Wrapper contract on Ropsten
    const ABI = [
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "_owner",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "_chainId",
                          "type": "uint256"
                        }
                      ],
                      "payable": false,
                      "stateMutability": "nonpayable",
                      "type": "constructor"
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
                          "name": "account",
                          "type": "address"
                        }
                      ],
                      "name": "Paused",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "fromAsset",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "sender",
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
                          "name": "toAddress",
                          "type": "bytes"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "net",
                          "type": "uint256"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "fee",
                          "type": "uint256"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        }
                      ],
                      "name": "PolyWrapperLock",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "fromAsset",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "bytes",
                          "name": "txHash",
                          "type": "bytes"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "sender",
                          "type": "address"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "efee",
                          "type": "uint256"
                        }
                      ],
                      "name": "PolyWrapperSpeedUp",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": false,
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        }
                      ],
                      "name": "Unpaused",
                      "type": "event"
                    },
                    {
                      "constant": true,
                      "inputs": [],
                      "name": "chainId",
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
                    },
                    {
                      "constant": true,
                      "inputs": [],
                      "name": "feeCollector",
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
                      "name": "lockProxy",
                      "outputs": [
                        {
                          "internalType": "contract ILockProxy",
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
                      "inputs": [],
                      "name": "paused",
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
                          "name": "collector",
                          "type": "address"
                        }
                      ],
                      "name": "setFeeCollector",
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
                          "name": "_lockProxy",
                          "type": "address"
                        }
                      ],
                      "name": "setLockProxy",
                      "outputs": [],
                      "payable": false,
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "constant": false,
                      "inputs": [],
                      "name": "pause",
                      "outputs": [],
                      "payable": false,
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "constant": false,
                      "inputs": [],
                      "name": "unpause",
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
                          "name": "token",
                          "type": "address"
                        }
                      ],
                      "name": "extractFee",
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
                          "name": "fromAsset",
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
                        },
                        {
                          "internalType": "uint256",
                          "name": "fee",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        }
                      ],
                      "name": "lock",
                      "outputs": [],
                      "payable": true,
                      "stateMutability": "payable",
                      "type": "function"
                    },
                    {
                      "constant": false,
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "fromAsset",
                          "type": "address"
                        },
                        {
                          "internalType": "bytes",
                          "name": "txHash",
                          "type": "bytes"
                        },
                        {
                          "internalType": "uint256",
                          "name": "fee",
                          "type": "uint256"
                        }
                      ],
                      "name": "speedUp",
                      "outputs": [],
                      "payable": true,
                      "stateMutability": "payable",
                      "type": "function"
                    }
                  ]
    const PRIVATE_KEY = Buffer.from("341d5a3c0c5a69ff684d165fef262ed92953a81a7791771dd0a91faca841d4f2", "hex")
    // ropsten: 0x5B7fB1C0f7713e030C29B41551eA4574b9146fB7
    const account = "0x231d51dbeC6E3E63Ad22078C73B70fBfD1b14265"
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDR)
    // ont: ASQa8m9nDuNB4HYbbTt5rN294taNykMhRk
    // tmpnet: 0x5b7fb1c0f7713e030c29b41551ea4574b9146fb7
    //const bytes = new Ont.Crypto.Address("ASQa8m9nDuNB4HYbbTt5rN294taNykMhRk").serialize()
    // lock("ropstn chain hash", "(to)chain id", "(to)address", amount, fee, (from)side-chain_id)
    // wePLT contract address = 0x4214ad91b47846eb8eccb1bd213f0d1f5ea44262
    let method = contract.methods.lock("0x0000000000000000000000000000000000000103", 2, account, web3.utils.toWei("0.0001", "ether"), web3.utils.toWei("0.0001", "ether"), 0)
    //let method = contract.methods.lock("0x0000000000000000000000000000000000000000", 3, "0x" + bytes, web3.utils.toWei("0.0001", "ether"), web3.utils.toWei("0.00001", "ether"), 0)
    let code = await method.encodeABI()
    console.log('code=' + code)

    let nonce;
    //const gasPrice = await web3.eth.getGasPrice()
    //console.log(gasPrice)
    	web3.eth.getTransactionCount(account).then(_nonce => {
    		nonce = _nonce.toString(16);
    		console.log("Nonce: " + nonce);

    		const common = new Common({"chain":{
                    "name": "quorum",
                    "chainId": 104,
                    "networkId": 104,
                    "comment": "quorum private chain",
                    "url": "http://127.0.0.1/",
                    "genesis": "0x0000000000000000000000000000000000000000000000000000000000000000",
                    "hardforks": [],
                    "bootstrapNodes": []
                  }})

    		const txParams = {
    			nonce: '0x' + nonce,
    			gasPrice: web3.utils.toHex(web3.utils.toWei('0', 'gwei')),
    			gasLimit: web3.utils.toHex(0),
    			value: web3.utils.toHex(web3.utils.toWei("0", "ether")),
    			from: account,
    			to: CONTRACT_ADDR,
    			data: code
    			};

    		const tx = new Tx(txParams, { common });
    		tx.sign(PRIVATE_KEY);
    		console.log("sign done.")

    		const serializedTx = tx.serialize();

    		web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
    			console.log(receipt);
    			})
    		});
}
main()