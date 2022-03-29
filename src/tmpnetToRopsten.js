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
var tx_1 = require("@ethereumjs/tx");
var quorumjs = require("quorum-js");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var Web3, web3, WRAPPER_CONTRACT_ADDR, WRAPPER_ABI, NATIVE_ABI, wrapperContract, nativeContractAddress, nativeContract, chainId, fromAccount, toAddress, approve_amount, amount2, fee, approveCode, lockCode, nonce, PRIVATE_KEY;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Web3 = require("web3");
                    web3 = new Web3(new Web3.providers.HttpProvider("http://18.220.17.201:22000"));
                    quorumjs.extend(web3);
                    WRAPPER_CONTRACT_ADDR = "0x0c5c0b03e897e7b1828f2bc923ea4498ec891060" // Wrapper contract on tmpnet
                    ;
                    WRAPPER_ABI = [
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
                    ];
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
                    ];
                    wrapperContract = new web3.eth.Contract(WRAPPER_ABI, WRAPPER_CONTRACT_ADDR);
                    nativeContractAddress = "0x0000000000000000000000000000000000000103";
                    nativeContract = new web3.eth.Contract(NATIVE_ABI, nativeContractAddress);
                    chainId = 2;
                    fromAccount = "0x231d51dbeC6E3E63Ad22078C73B70fBfD1b14265";
                    toAddress = "231d51dbeC6E3E63Ad22078C73B70fBfD1b14265" //ropsten address
                    ;
                    approve_amount = web3.utils.toWei('0.001', 'ether');
                    amount2 = web3.utils.toWei('0.0008', 'ether');
                    fee = web3.utils.toWei('0.0005', 'ether');
                    return [4 /*yield*/, nativeContract.methods.approve(WRAPPER_CONTRACT_ADDR, approve_amount).encodeABI()];
                case 1:
                    approveCode = _a.sent();
                    return [4 /*yield*/, wrapperContract.methods.lock(nativeContractAddress, chainId, "0x" + toAddress, amount2, fee, 0).encodeABI()];
                case 2:
                    lockCode = _a.sent();
                    console.log('lockCode=' + lockCode);
                    PRIVATE_KEY = Buffer.from("341d5a3c0c5a69ff684d165fef262ed92953a81a7791771dd0a91faca841d4f2", "hex");
                    web3.eth.getTransactionCount(fromAccount).then(function (_nonce) {
                        nonce = _nonce.toString(16);
                        console.log("Nonce: " + _nonce);
                        var common = new common_1["default"]({ "chain": {
                                "name": "quorum",
                                "chainId": 104,
                                "networkId": 104,
                                "comment": "quorum private chain",
                                "url": "http://127.0.0.1/",
                                "genesis": "0x0000000000000000000000000000000000000000000000000000000000000000",
                                "hardforks": [],
                                "bootstrapNodes": []
                            } });
                        var txParams = {
                            nonce: _nonce,
                            gasPrice: 0,
                            gasLimit: 0,
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
                        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', function (receipt) {
                            console.log(receipt);
                            web3.eth.getTransactionCount(fromAccount).then(function (_nonce) {
                                nonce = _nonce.toString(16);
                                console.log("Nonce: " + _nonce);
                                var txParams = {
                                    nonce: _nonce,
                                    gasPrice: 0,
                                    gasLimit: 0,
                                    from: fromAccount,
                                    value: 0,
                                    to: WRAPPER_CONTRACT_ADDR,
                                    data: lockCode
                                };
                                var tx = new tx_1.Transaction(txParams, { common: common }).sign(PRIVATE_KEY);
                                console.log("sign done.");
                                console.log(tx.toJSON());
                                var serializedTx = tx.serialize();
                                console.log("sendSignedTransaction: 0x" + serializedTx.toString('hex'));
                                web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', function (receipt) {
                                    console.log(receipt);
                                });
                            });
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
main();
