import Common from "@ethereumjs/common";
import { Transaction } from "@ethereumjs/tx";
import BN = require("bn.js");
const quorumjs = require("quorum-js");

async function main() {
  const Web3 = require("web3");
  const web3 = new Web3(new Web3.providers.HttpProvider("http://18.220.17.201:22000"))
  quorumjs.extend(web3)
  const CONTRACT_ADDR = "0x0c5c0b03e897e7b1828f2bc923ea4498ec891060" // Wrapper contract on tmpnet
  const ABI = [
    {"type":"function","constant":true,"name":"transferOwnership","inputs":[{"name":"newOwner","type":"address"}],"outputs":[{"name":"succeed","type":"bool"}]},
    {"type":"function","constant":true,"name":"ownership","inputs":[],"outputs":[{"name":"owner","type":"address"}]},
    {"type":"function","constant":true,"name":"name","inputs":[],"outputs":[{"name":"_name","type":"string"}],"payable":false,"stateMutability":"view"},
    {"type":"function","constant":true,"name":"totalSupply","inputs":[],"outputs":[{"name":"_supply","type":"uint256"}],"payable":false,"stateMutability":"view"},
    {"type":"function","constant":true,"name":"decimals","inputs":[],"outputs":[{"name":"_decimal","type":"uint256"}],"payable":false,"stateMutability":"view"},
    {"type":"function","constant":true,"name":"symbol","inputs":[],"outputs":[{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"view"},
    {"type":"function","constant":false,"name":"approve","inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"outputs":[{"name":"_result","type":"bool"}],"payable":false,"stateMutability":"nonpayable"},
    {"type":"function","constant":false,"name":"transfer","inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"outputs":[{"name":"_result","type":"bool"}],"payable":false,"stateMutability":"nonpayable"},
    {"type":"function","constant":false,"name":"mint","inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"outputs":[],"payable":false,"stateMutability":"nonpayable"},
    {"type":"function","constant":false,"name":"burn","inputs":[{"name":"value","type":"uint256"}],"outputs":[],"payable":false,"stateMutability":"nonpayable"},
    {"type":"function","constant":false,"name":"bindAsset","inputs":[{"name":"chainId","type":"uint64"},{"name":"toAsset","type":"bytes"}],"outputs":[{"name":"_result","type":"bool"}],"payable":false,"stateMutability":"nonpayable"},
    {"type":"function","constant":true,"name":"getBindedAsset","inputs":[{"name":"chainId","type":"uint64"}],"outputs":[{"name":"asset","type":"bytes"}],"payable":false,"stateMutability":"view"},
    {"type":"function","constant":false,"name":"bindProxy","inputs":[{"name":"chainId","type":"uint64"},{"name":"proxy","type":"bytes"}],"outputs":[{"name":"_result","type":"bool"}],"payable":false,"stateMutability":"nonpayable"},
    {"type":"function","constant":true,"name":"getBindedProxy","inputs":[{"name":"chainId","type":"uint64"}],"outputs":[{"name":"proxy","type":"bytes"}],"payable":false,"stateMutability":"view"},
    {"type":"function","constant":false,"name":"transferFrom","inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"outputs":[{"name":"_result","type":"bool"}],"payable":false,"stateMutability":"nonpayable"},
    {"type":"function","constant":true,"name":"balanceOf","inputs":[{"name":"owner","type":"address"}],"outputs":[{"name":"_balance","type":"uint256"}],"payable":false,"stateMutability":"view"},
    {"type":"function","constant":true,"name":"allowance","inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"outputs":[{"name":"_value","type":"uint256"}],"payable":false,"stateMutability":"view"},
    {"type":"function","constant":false,"name":"setManagerProxy","inputs":[{"name":"ccmp","type":"address"}],"outputs":[],"payable":false,"stateMutability":"nonpayable"},
    {"type":"function","constant":true,"name":"getManagerProxy","inputs":[],"outputs":[{"name":"proxy","type":"address"}],"payable":false,"stateMutability":"view"},
    {"constant":false,"inputs":[{"internalType":"uint64","name":"toChainId","type":"uint64"},{"internalType":"bytes","name":"toAddress","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"lock","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},
    {"constant":false,"inputs":[{"internalType":"bytes","name":"argsBs","type":"bytes"},{"internalType":"bytes","name":"fromContract","type":"bytes"},{"internalType":"uint64","name":"fromChainId","type":"uint64"}],"name":"unlock","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"type":"event","anonymous":false,"name":"transferOwnership","inputs":[{"indexed":false,"name":"newOwner","type":"address"}]},
    {"type":"event","anonymous":false,"name":"transfer","inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}]},
    {"type":"event","anonymous":false,"name":"bindAsset","inputs":[{"indexed":false,"name":"chainId","type":"uint64"},{"indexed":false,"name":"toAsset","type":"bytes"}]},
    {"type":"event","anonymous":false,"name":"bindProxy","inputs":[{"indexed":false,"name":"chainId","type":"uint64"},{"indexed":false,"name":"proxy","type":"bytes"}]},
    {"type":"event","anonymous":false,"name":"approval","inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}]},
    {"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"fromAssetHash","type":"address"},{"indexed":false,"internalType":"address","name":"fromAddress","type":"address"},{"indexed":false,"internalType":"uint64","name":"toChainId","type":"uint64"},{"indexed":false,"internalType":"bytes","name":"toAssetHash","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"toAddress","type":"bytes"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"lock","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"toAssetHash","type":"address"},{"indexed":false,"internalType":"address","name":"toAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unlock","type":"event"}
  ]
  // lock("currency contract address", "(to)chain id", "(to)address", amount, fee, (from)side-chain_id)
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDR)
  const currencyContract = "0x0000000000000000000000000000000000000103"
  const chainId = 2
  const toAddress = "231d51dbeC6E3E63Ad22078C73B70fBfD1b14265" //ropsten address
  const amount = web3.utils.toWei('0.001', 'ether')
  const fee = web3.utils.toWei('0.012', 'ether')
  //let method = contract.methods.lock(currencyContract, chainId, "0x" + toAddress, amount, fee, 0)
  let method = contract.methods.lock(chainId, "0x" + toAddress, amount)
  let code = await method.encodeABI()
  console.log('code=' + code)

  let nonce;
  //const gasPrice = await web3.eth.getGasPrice()
  //console.log(gasPrice)
  const PRIVATE_KEY = Buffer.from("341d5a3c0c5a69ff684d165fef262ed92953a81a7791771dd0a91faca841d4f2", "hex")
  const account = "0x231d51dbeC6E3E63Ad22078C73B70fBfD1b14265"
  web3.eth.getTransactionCount(account).then(_nonce => {
    nonce = _nonce.toString(16);
    console.log("Nonce: " + _nonce);

    const txParams = {
      nonce: _nonce as number,
      gasPrice: 0, // 0がmust
      gasLimit: 0,
      value: 0, // PLTはchain通貨がないので0
      to: currencyContract,
      data: code
    };

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
    const tx = new Transaction(txParams, { common }).sign(PRIVATE_KEY);
    console.log("sign done.")
    console.log(tx.toJSON())
    console.log("Sender: " + tx.getSenderAddress())

    const serializedTx = tx.serialize();

    console.log("sendSignedTransaction: 0x" + serializedTx.toString('hex'))
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
      console.log(receipt);
    })
  });
}
main()
