import Common from "@ethereumjs/common";
import { Chain } from "@ethereumjs/common";
import { Transaction } from "@ethereumjs/tx";

const e2p = {
  network_endpoint: "https://rpc.sepolia.org/",
  wrapper_contract_address: "0xbA6F835ECAE18f5Fc5eBc074e5A0B94422a13126",
  token_contract_address: "0xd17EC21111526E888585da6fC7c6c1f3D6cEF593",
  from_address: "0xA0b06BF06b3Df01E5a18ED72e35c5d4A898E2B3f",
  from_address_priv_key: "1488f96696b9cd278ce3998ed94228895bd7f2ce0b2ae4e4b1e8558cab63ca2c",
  to_address: "0xCD985714a3A3c764dFE2c14f5B8a2480De3F3Bb4",
  approve_amount_eth: "0.01",
  lock_proxy: "0x95a10b809c9Cfd51A46652C785ac73d7269834b9",
  BCS_Palette2_polychainId: 1002,
  Sepolia_chainId: 11155111,
}

// 自分のメタマスクアドレスからラッパーコントラクトへトランザクションを送信
// なんのラッパーなのか不明。（polynetworkのブリッジ機能を持つもの）
// wrapperContract.methods.lock("0x0000000000000000000000000000000000000103", chainId, toAddress, amount, fee, 0).encodeABI()を
// 本データとして送信することで、WRAPPER_CONTRACT_ADDRが自分のメタマスクアドレスからamount分引き出しロックする。
// その結果として、amountに対応するsepoliaETHがtoAddressへ送られる
async function main() {
  const quorumjs = require("quorum-js");
  const Web3 = require("web3");
  const web3 = new Web3(new Web3.providers.HttpProvider(e2p.network_endpoint))
  quorumjs.extend(web3)
  const WRAPPER_CONTRACT_ADDR = e2p.wrapper_contract_address
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
  ] // どこを参照すればよいか不明
  const fromAccount = e2p.from_address
  const wrapperContract = new web3.eth.Contract(WRAPPER_ABI, WRAPPER_CONTRACT_ADDR)
  const chainId = e2p.BCS_Palette2_polychainId
  const toAddress = e2p.to_address
  const amount = web3.utils.toWei('0.0001', 'ether')
  // const fee = web3.utils.toWei('0', 'ether')
  let lockCode = await wrapperContract.methods.lock(e2p.token_contract_address, chainId, toAddress, amount, 0, 0).encodeABI()
  console.log('lockCode=' + lockCode)
  let nonce;
  const PRIVATE_KEY = Buffer.from(e2p.from_address_priv_key, "hex") // 自分のメタマスク
  const gasLimit = await web3.eth.estimateGas({
    from: fromAccount,
    to: WRAPPER_CONTRACT_ADDR,
    data: lockCode,
  });
  const gasPrice = parseInt(await web3.eth.getGasPrice());
  console.log(gasLimit);
  console.log(gasPrice);
  web3.eth.getTransactionCount(fromAccount).then((_nonce: string | number) => {
    nonce = _nonce.toString(16);
    console.log("Nonce: " + _nonce);
    // const common = new Common({
    //     "chain": {
    //         "name": "quorum",
    //         "chainId": 200,
    //         "networkId": 200,
    //         "comment": "quorum private chain",
    //         "url": "http://127.0.0.1/",
    //         "genesis": "0x0000000000000000000000000000000000000000000000000000000000000000",
    //         "hardforks": [],
    //         "bootstrapNodes": []
    //     }
    // })
    const common = new Common({ chain: Chain.Sepolia })
    const txParams = {
      nonce: _nonce as number,
      gasPrice,
      gasLimit,
      value: 0,
      to: WRAPPER_CONTRACT_ADDR,
      data: lockCode
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
