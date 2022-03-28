import Web3 from "web3";
async function main() {
    const Web3 = require("web3");
    const Tx = require('ethereumjs-tx').Transaction;
    const Ont = require('ontology-ts-sdk')
    const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9986cb2f179c40ae8c5bf317ec2154ac"))
    const CONTRACT_ADDR = "0xdc37471af6a8ab7f45f444c5a3ef4758281be32c" // Wrapper contract on Ropsten
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
    const PRIVATE_KEY = Buffer.from("e9bac022a4a1f6d43810955750f896b7b0990eb24c49e338032e8003e37347a4", "hex")
    // ropsten: 0x5B7fB1C0f7713e030C29B41551eA4574b9146fB7
    const account = "0x5b7fb1c0f7713e030c29b41551ea4574b9146fb7"
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDR)
    // ont: ASQa8m9nDuNB4HYbbTt5rN294taNykMhRk
    // bnb: 0x1837EA6fae8D49ded508c00CF8ACd4Aeb15461B8
    // const bytes = Buffer.from("ASQa8m9nDuNB4HYbbTt5rN294taNykMhRk")
    const bytes = new Ont.Crypto.Address("ASQa8m9nDuNB4HYbbTt5rN294taNykMhRk").serialize()
    //const bytes = "4a26aa47a9bbaf1367f9df5d6fc84b23230f445c" //tmpnet address
    //const bytes = Buffer.from(address)
    // lock("ropstn chain hash", "(to)chain id", "(to)address", amount, fee, (from)side-chain_id)
    // wePLT contract address = 0x4214ad91b47846eb8eccb1bd213f0d1f5ea44262
    //let method = contract.methods.lock("0x4214ad91b47846eb8eccb1bd213f0d1f5ea44262", 1001, "0x" + bytes, 1, 0, 0)
    let method = contract.methods.lock("0x8Cad2301F7348DFc10C65778197028F432d51e76", 3, "0x" + bytes, 10000000, 10000000, 0)
    let code = await method.encodeABI()
    console.log('code=' + code)

    let nonce;
    //const gasPrice = await web3.eth.getGasPrice()
    //console.log(gasPrice)
    	web3.eth.getTransactionCount(account).then(_nonce => {
    		nonce = _nonce.toString(16);
    		console.log("Nonce: " + nonce);

    		const txParams = {
    			nonce: '0x' + nonce,
    			gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
    			gasLimit: web3.utils.toHex(1000000),
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
}
main()