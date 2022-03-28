import Web3 from "web3";
async function main() {
    const Web3 = require("web3");
    const Tx = require('ethereumjs-tx').Transaction;
    const Ont = require('ontology-ts-sdk')
    const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9986cb2f179c40ae8c5bf317ec2154ac"))
    const CONTRACT_ADDR = "0x4214ad91B47846Eb8ECCb1BD213F0d1f5Ea44262" // wePLT contract on Ropsten
    const ABI = [
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "owner",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "spender",
                          "type": "address"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        }
                      ],
                      "name": "Approval",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        }
                      ],
                      "name": "Transfer",
                      "type": "event"
                    },
                    {
                      "constant": true,
                      "inputs": [],
                      "name": "totalSupply",
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
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        }
                      ],
                      "name": "balanceOf",
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
                      "constant": false,
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "recipient",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "amount",
                          "type": "uint256"
                        }
                      ],
                      "name": "transfer",
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
                          "name": "owner",
                          "type": "address"
                        },
                        {
                          "internalType": "address",
                          "name": "spender",
                          "type": "address"
                        }
                      ],
                      "name": "allowance",
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
                      "constant": false,
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "spender",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "amount",
                          "type": "uint256"
                        }
                      ],
                      "name": "approve",
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
                          "name": "sender",
                          "type": "address"
                        },
                        {
                          "internalType": "address",
                          "name": "recipient",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "amount",
                          "type": "uint256"
                        }
                      ],
                      "name": "transferFrom",
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
                          "name": "spender",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "addedValue",
                          "type": "uint256"
                        }
                      ],
                      "name": "increaseAllowance",
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
                          "name": "spender",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "subtractedValue",
                          "type": "uint256"
                        }
                      ],
                      "name": "decreaseAllowance",
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
                    }
                  ]
    const PRIVATE_KEY = Buffer.from("e9bac022a4a1f6d43810955750f896b7b0990eb24c49e338032e8003e37347a4", "hex")
    // ropsten: 0x5B7fB1C0f7713e030C29B41551eA4574b9146fB7
    const account = "0x5b7fb1c0f7713e030c29b41551ea4574b9146fb7"
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDR)
    // tmpnet: 0x5b7fb1c0f7713e030c29b41551ea4574b9146fb7
    //const bytes = new Ont.Crypto.Address("ASQa8m9nDuNB4HYbbTt5rN294taNykMhRk").serialize()
    // lock("ropstn chain hash", "(to)chain id", "(to)address", amount, fee, (from)side-chain_id)
    const bytes = "0xdc37471af6a8ab7f45f444c5a3ef4758281be32c"
    // wePLT contract address = 0x4214ad91b47846eb8eccb1bd213f0d1f5ea44262
    let method = contract.methods.approve(bytes, web3.utils.toWei("0.00001", "ether"))
    //let method = contract.methods.lock("0x0000000000000000000000000000000000000000", 3, "0x" + bytes, web3.utils.toWei("0.0001", "ether"), web3.utils.toWei("0.00001", "ether"), 0)
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
    			value: web3.utils.toHex(web3.utils.toWei("0", "ether")),
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