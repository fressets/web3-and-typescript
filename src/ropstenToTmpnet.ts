import Common from "@ethereumjs/common";
import { Transaction } from "@ethereumjs/tx";

async function main() {
  const Web3 = require("web3");
  const Tx = require('ethereumjs-tx').Transaction;
  const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9986cb2f179c40ae8c5bf317ec2154ac"))
  const WRAPPER_CONTRACT_ADDR = "0xdc37471af6a8ab7f45f444c5a3ef4758281be32c" // Wrapper contract on Ropsten
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

  const ERC20_ABI = [
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

  // lock("currency contract address", "(to)chain id", "(to)address", amount, fee, (from)side-chain_id)
  const wrapperContract = new web3.eth.Contract(WRAPPER_ABI, WRAPPER_CONTRACT_ADDR)
  const currencyContract = "0x4214ad91b47846eb8eccb1bd213f0d1f5ea44262"
  const chainId = 1001
  const toAddress = "231d51dbeC6E3E63Ad22078C73B70fBfD1b14265" //tmpnet address
  const amount = web3.utils.toWei('1.00', 'ether')
  const fee = web3.utils.toWei('0.01', 'ether')

  let approveCode = new web3.eth.Contract(ERC20_ABI, currencyContract).methods.approve(WRAPPER_CONTRACT_ADDR, amount).encodeABI()
  let lockCode = wrapperContract.methods.lock(currencyContract, chainId, "0x" + toAddress, amount, 0, 0).encodeABI()
  //let method = contract.methods.lock(chainId, "0x" + toAddress, amount)

  let nonce;
  //const gasPrice = await web3.eth.getGasPrice()
  //console.log(gasPrice)
  const PRIVATE_KEY = Buffer.from("341d5a3c0c5a69ff684d165fef262ed92953a81a7791771dd0a91faca841d4f2", "hex")
  const account = "0x231d51dbeC6E3E63Ad22078C73B70fBfD1b14265"
  web3.eth.getTransactionCount(account).then(_nonce => {
    nonce = _nonce.toString(16);
    console.log("Nonce: " + nonce);

    const txParams = {
      nonce: '0x' + nonce,
      gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
      gasLimit: web3.utils.toHex(1000000),
      value: web3.utils.toHex(web3.utils.toWei("0", "wei")),
      to: currencyContract,
      data: approveCode
    };
    const common = new Common({"chain":"ropsten"})
    const tx = new Transaction(txParams, { common }).sign(PRIVATE_KEY);
    console.log("sign done.")
    console.log(tx.toJSON())
    console.log("Sender: " + tx.getSenderAddress())

    const serializedTx = tx.serialize();

    console.log("sendSignedTransaction: 0x" + serializedTx.toString('hex'))
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
      console.log(receipt);

      web3.eth.getTransactionCount(account).then(_nonce => {
        nonce = _nonce.toString(16);
        console.log("Nonce: " + nonce);

        const txParams = {
          nonce: '0x' + nonce,
          gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
          gasLimit: web3.utils.toHex(1000000),
          value: web3.utils.toHex(web3.utils.toWei("0", "wei")),
          to: WRAPPER_CONTRACT_ADDR,
          data: lockCode
        };
        const common = new Common({"chain": "ropsten"})
        const tx = new Transaction(txParams, {common}).sign(PRIVATE_KEY);
        console.log("sign done.")
        console.log(tx.toJSON())
        console.log("Sender: " + tx.getSenderAddress())

        const serializedTx = tx.serialize();

        console.log("sendSignedTransaction: 0x" + serializedTx.toString('hex'))
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
          console.log(receipt);
        })
      });
    })
  });
}
main()
