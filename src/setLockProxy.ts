import Common from "@ethereumjs/common";
import { Transaction } from "@ethereumjs/tx";
import BN = require("bn.js");
const quorumjs = require("quorum-js");

const adminPrivKey = "68658531f5d44015be8d9404b8963f301e4ab064443ecb62e76e9132f1bec531"
const ccmPrivKey = "d1b5a4bd4e1f2589b2cbf878105e1f7ad5d4ed0e41708f9b854e9812f68b4246"
async function main() {
    const Web3 = require("web3");
    const web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"))
    quorumjs.extend(web3)
    const WRAPPER_CONTRACT_ADDR = "0x7A3C7a75EF1e44800d75101cb2baa53506559c76"
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
        "constant": false,
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
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
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    const wrapperContract = new web3.eth.Contract(WRAPPER_ABI, WRAPPER_CONTRACT_ADDR)
    const lockProxy = "0x0000000000000000000000000000000000000103"
    let code = await wrapperContract.methods.setLockProxy(lockProxy).encodeABI()
    let nonce;
    const PRIVATE_KEY = Buffer.from(adminPrivKey, "hex")
    const CrossChainAdmin = "0x0000000000000000000000000000000000000102"
    const admin = "0xb936b5CDa162dd6d330E2475dd119e0257c855Ec"
    console.log(await wrapperContract.methods.owner().call())
    web3.eth.getTransactionCount(admin).then((_nonce: string | number) => {
        nonce = _nonce.toString(16);
        console.log("Nonce: " + _nonce);
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
        const txParams = {
            nonce: _nonce as number,
            gasPrice: 0, // 0がmust
            gasLimit: 0,
            value: 0, // PLTはchain通貨がないので0
            to: WRAPPER_CONTRACT_ADDR,
            data: code
        };
        const tx = new Transaction(txParams, { common }).sign(PRIVATE_KEY);
        console.log("sign done.")
        console.log(tx.toJSON())
        const serializedTx = tx.serialize();
        console.log("sendSignedTransaction: 0x" + serializedTx.toString('hex'))
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