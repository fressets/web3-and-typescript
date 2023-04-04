"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var common_1 = __importDefault(require("@ethereumjs/common"));
var common_2 = require("@ethereumjs/common");
var tx_1 = require("@ethereumjs/tx");
var e2p = {
    network_endpoint: "https://rpc.sepolia.org/",
    wrapper_contract_address: "0xbA6F835ECAE18f5Fc5eBc074e5A0B94422a13126",
    token_contract_address: "0xd17EC21111526E888585da6fC7c6c1f3D6cEF593",
    from_address: "0xA0b06BF06b3Df01E5a18ED72e35c5d4A898E2B3f",
    from_address_priv_key: "1488f96696b9cd278ce3998ed94228895bd7f2ce0b2ae4e4b1e8558cab63ca2c",
    to_address: "0xCD985714a3A3c764dFE2c14f5B8a2480De3F3Bb4",
    approve_amount_eth: "0.01",
    BCS_Palette2_polychainId: 1002,
    Sepolia_chainId: 11155111
};
var p2e = {
    network_endpoint: "http://100.20.221.48:22000",
    wrapper_contract_address: "0xdF539255E823b9D08aAD0b7D7b89868246f65B5a",
    token_contract_address: "0x0000000000000000000000000000000000000103",
    from_address: "0xCD985714a3A3c764dFE2c14f5B8a2480De3F3Bb4",
    from_address_priv_key: "",
    to_address: "0xA0b06BF06b3Df01E5a18ED72e35c5d4A898E2B3f",
    approve_amount_eth: "2.01",
    BCS_Palette2_chainId: 200,
    Sepolia_polychainId: 602
};
var WRAPPER_CONTRACT_ADDR = e2p.wrapper_contract_address;
var nativeContractAddress = e2p.token_contract_address;
var fromAccount = e2p.from_address;
var PRIVATE_KEY = Buffer.from(e2p.from_address_priv_key, "hex");
// const common = new Common({
//     "chain": {
//         "name": "quorum",
//         "chainId": e2p.Sepolia_chainId,
//         "networkId": e2p.Sepolia_chainId,
//         "comment": "quorum private chain",
//         "url": "http://127.0.0.1/",
//         "genesis": "0x0000000000000000000000000000000000000000000000000000000000000000",
//         "hardforks": [],
//         "bootstrapNodes": []
//     }
// })
var common = new common_1["default"]({ chain: common_2.Chain.Sepolia });
// 自分のメタマスクアドレスからprc20tokenコントラクトへトランザクションを送信
// nativeContract.methods.approve(WRAPPER_CONTRACT_ADDR, approve_amount).encodeABI()を本データとして送信する
// ことで、WRAPPER_CONTRACT_ADDRが自分のメタマスクアドレスからapprove_amount分引き出すことを許可する
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var quorumjs, Web3, web3, approve_amount, NATIVE_ABI, nativeContract, approveCode, nonce, gasLimit, gasPrice, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    quorumjs = require("quorum-js");
                    Web3 = require("web3");
                    web3 = new Web3(new Web3.providers.HttpProvider(e2p.network_endpoint));
                    quorumjs.extend(web3);
                    approve_amount = web3.utils.toWei(e2p.approve_amount_eth, 'ether');
                    NATIVE_ABI = [
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
                    ] // どこを参照すればよいか不明
                    ;
                    nativeContract = new web3.eth.Contract(NATIVE_ABI, nativeContractAddress);
                    return [4 /*yield*/, nativeContract.methods.approve(WRAPPER_CONTRACT_ADDR, approve_amount).encodeABI()];
                case 1:
                    approveCode = _b.sent();
                    return [4 /*yield*/, web3.eth.estimateGas({
                            from: fromAccount,
                            to: nativeContractAddress,
                            data: approveCode
                        })];
                case 2:
                    gasLimit = _b.sent();
                    _a = parseInt;
                    return [4 /*yield*/, web3.eth.getGasPrice()];
                case 3:
                    gasPrice = _a.apply(void 0, [_b.sent()]);
                    console.log(gasLimit);
                    console.log(gasPrice);
                    web3.eth.getTransactionCount(fromAccount).then(function (_nonce) {
                        nonce = _nonce.toString(16);
                        console.log("Nonce: " + _nonce);
                        var txParams = {
                            nonce: _nonce,
                            gasPrice: gasPrice,
                            gasLimit: gasLimit,
                            from: fromAccount,
                            value: 0,
                            to: nativeContractAddress,
                            data: approveCode
                        };
                        var tx = new tx_1.Transaction(txParams, { common: common }).sign(PRIVATE_KEY);
                        console.log("sign done.");
                        console.log(tx.toJSON());
                        var serializedTx = tx.serialize();
                        console.log("approve sendSignedTransaction: 0x" + serializedTx.toString('hex'));
                        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
                            .then(function (receipt) {
                            console.log('Transaction receipt:', receipt);
                        })["catch"](function (error) {
                            console.error('Error occurred:', error);
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
main();
