import Common from "@ethereumjs/common";
import { Transaction } from "@ethereumjs/tx";
import BN = require("bn.js");
const quorumjs = require("quorum-js");

async function main() {
  const Web3 = require("web3");
  const web3 = new Web3(new Web3.providers.HttpProvider("http://18.220.17.201:22000"))
  quorumjs.extend(web3)
  const WRAPPER_CONTRACT_ADDR = "0x0c5c0b03e897e7b1828f2bc923ea4498ec891060" // Wrapper contract on tmpnet
  const WRAPPER_ABI = [
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

  // lock("currency contract address", "(to)chain id", "(to)address", amount, fee, (from)side-chain_id)
  const wrapperContract = new web3.eth.Contract(WRAPPER_ABI, WRAPPER_CONTRACT_ADDR)
  const chainId = 2
  const fromAccount = "0x231d51dbeC6E3E63Ad22078C73B70fBfD1b14265"
  const toAddress = "231d51dbeC6E3E63Ad22078C73B70fBfD1b14265" //ropsten address
  const amount = web3.utils.toWei('0.0001', 'ether')
  const amount2 = web3.utils.toWei('0.0001', 'ether')
  const fee = web3.utils.toWei('0.0001', 'ether')
  //let method = contract.methods.lock(currencyContract, chainId, "0x" + toAddress, amount, fee, 0)

  let lockCode = await wrapperContract.methods.lock("0x0000000000000000000000000000000000000103", chainId, "0x" + toAddress, amount2, fee, 0).encodeABI()
  console.log('lockCode=' + lockCode)

  let nonce;
  //const gasPrice = await web3.eth.getGasPrice()
  //console.log(gasPrice)
  const PRIVATE_KEY = Buffer.from("341d5a3c0c5a69ff684d165fef262ed92953a81a7791771dd0a91faca841d4f2", "hex")

  web3.eth.getTransactionCount(fromAccount).then(_nonce => {
    nonce = _nonce.toString(16);
    console.log("Nonce: " + _nonce);

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
          nonce: _nonce as number,
          gasPrice: 0, // 0がmust
          gasLimit: 0,
          value: 0, // PLTはchain通貨がないので0
          to: WRAPPER_CONTRACT_ADDR,
          data: lockCode
        };

        const tx = new Transaction(txParams, { common }).sign(PRIVATE_KEY);
        console.log("sign done.")
        console.log(tx.toJSON())

        const serializedTx = tx.serialize();

        console.log("sendSignedTransaction: 0x" + serializedTx.toString('hex'))
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
          console.log(receipt);
        })
    });

}
main()
