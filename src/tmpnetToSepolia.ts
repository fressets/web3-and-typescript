import Common from "@ethereumjs/common";
import { Transaction } from "@ethereumjs/tx";
const quorumjs = require("quorum-js");

async function main() {
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
  ]
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
  const parameter = {
    "withApprove": true,
    "withLock": false,
    "approveAmount": "2.01",
    "endpoint": "http://100.20.221.48:22000", // stgにあるフルノード
    "nativeContractAddress": "0x0000000000000000000000000000000000000103", // PLT
    "WRAPPER_CONTRACT_ADDR": "0xdF539255E823b9D08aAD0b7D7b89868246f65B5a", // ?https://github.com/polynetwork/docs/blob/master/config/README_TestNet.md#BCS-Palette-2
    "WRAPPER_ABI": WRAPPER_ABI, // 
    "sepoliaChainId": 602, // OK? or 11155111
    "pltFromAddress": "0xCD985714a3A3c764dFE2c14f5B8a2480De3F3Bb4", // 自分のmetamask
    "sepoliaToAddress": "0xA0b06BF06b3Df01E5a18ED72e35c5d4A898E2B3f", // 自分のmetamask
  }
  const PRIVATE_KEY = Buffer.from("f22585c397340c73a05253897bc442d966e394ad77c3e085c2efdcf67186f11d", "hex")
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
  const Web3 = require("web3");
  const web3 = new Web3(new Web3.providers.HttpProvider(parameter.endpoint))
  quorumjs.extend(web3)
  // lock("currency contract address", "(to)chain id", "(to)address", amount, fee, (from)side-chain_id)
  const wrapperContract = new web3.eth.Contract(WRAPPER_ABI, parameter.WRAPPER_CONTRACT_ADDR)
  const amount2 = web3.utils.toWei('0.001', 'ether')
  const fee = web3.utils.toWei('0.0001', 'ether')

  // get nonce

  const n = await web3.eth.getTransactionCount(parameter.pltFromAddress, 'pending');
  console.log("n: " + n);
  let _nonce = await web3.eth.getTransactionCount(parameter.pltFromAddress)
  console.log("Nonce: " + _nonce);

  //
  // approve
  //
  const nativeContractAddress = parameter.nativeContractAddress;
  const nativeContract = new web3.eth.Contract(NATIVE_ABI, nativeContractAddress)
  if (parameter.withApprove) {
    const approve_amount = web3.utils.toWei(parameter.approveAmount, 'ether')
    let approveCode = await nativeContract.methods.approve(parameter.WRAPPER_CONTRACT_ADDR, approve_amount).encodeABI();
    const txParams = {
      nonce: _nonce as number + 1,
      gasPrice: 0, // 0がmust
      gasLimit: 0,
      from: parameter.pltFromAddress,
      value: 0, // PLTはchain通貨がないので0
      to: nativeContractAddress,
      data: approveCode
    };
    const tx = new Transaction(txParams).sign(PRIVATE_KEY);
    console.log("sign done.")
    console.log(tx.toJSON())
    const serializedTx = tx.serialize();
    console.log("approve sendSignedTransaction: 0x" + serializedTx.toString('hex'))
    await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', async (receipt: any) => {
      console.log(receipt);
      // get nonce
      _nonce = await web3.eth.getTransactionCount(parameter.pltFromAddress)
      console.log("Nonce: " + _nonce);

      //
      // lock
      //
      if (parameter.withLock) {
        //let method = contract.methods.lock(currencyContract, chainId, "0x" + toAddress, amount, fee, 0)
        let lockCode = await wrapperContract.methods.lock(
          "0x0000000000000000000000000000000000000103",
          parameter.sepoliaChainId,
          parameter.sepoliaToAddress,
          amount2,
          fee,
          0
        ).encodeABI()
        console.log('lockCode=' + lockCode)
        const txParams = {
          nonce: _nonce as number,
          gasPrice: 0, // 0がmust
          gasLimit: 0,
          value: 0, // PLTはchain通貨がないので0
          to: parameter.WRAPPER_CONTRACT_ADDR,
          data: lockCode
        };
        const tx = new Transaction(txParams).sign(PRIVATE_KEY);
        console.log("sign done.")
        console.log(tx.toJSON())
        const serializedTx = tx.serialize();
        console.log("sendSignedTransaction: 0x" + serializedTx.toString('hex'))
        const _ = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', (receipt: any) => {
          console.log(" lock result")
          console.log(receipt);
        })
      }
    });
  }
}
main()
