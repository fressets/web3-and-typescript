import Web3 from "web3";
import Common from 'ethereumjs-common';
async function main() {
    const Web3 = require("web3");
    const Tx = require('ethereumjs-tx').Transaction;
    const web3 = new Web3(new Web3.providers.HttpProvider("http://18.182.239.137:22000"))
    console.log("task start.")
    const CONTRACT_ADDR = "0x0c5c0b03e897e7b1828f2bc923ea4498ec891060" // Wrapper contract on tmpnet

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

    const PRIVATE_KEY = Buffer.from("39185b5aa1494ada9e9e22f91c793e4c7dd106deafc9fc0ab3198774aeec22cb", "hex")
    const account = "0x6c9931f85d8efa2ab83eb6f11626df43cfb616f6"
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDR)
    const bytes = "5B7fB1C0f7713e030C29B41551eA4574b9146fB7"
    console.log(bytes)
    // lock("ropstn chain hash", "(to)chain id", "(to)address", amount, fee, (from)side-chain_id)
    let method = contract.methods.lock("0x0000000000000000000000000000000000000103", 2, "0x" + bytes, 300000000000000, 100000000000000, 0)
    let code = await method.encodeABI()
    console.log('code=' + code)

    let nonce;
        	web3.eth.getTransactionCount(account).then(_nonce => {
        		nonce = _nonce.toString(16);
        		console.log("Nonce: " + nonce);

        		const customCommon = Common.forCustomChain(
                  'mainnet',
                  {
                    name: 'tmpnet',
                    networkId: 104,
                    chainId: 104,
                  },
                  'petersburg',
                )

        		const txParams = {
        		    chainId: '0x3',
        			nonce: '0x' + nonce,
        			gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
        			gasLimit: web3.utils.toHex(300000),
        			value: web3.utils.toHex(web3.utils.toWei("300000000000000", "wei")),
        			from: account,
        			to: CONTRACT_ADDR,
        			data: code
        			};

                console.log(txParams.gasPrice)
        		const tx = new Tx(txParams);
        		tx.sign(PRIVATE_KEY);
        		console.log("sign done.")

        		const serializedTx = tx.serialize();

                console.log("send tx")
        		web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
        			console.log(receipt);
        			})
        		});
}

main()