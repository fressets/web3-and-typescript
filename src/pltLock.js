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
// 自分のメタマスクアドレスからラッパーコントラクトへトランザクションを送信
// なんのラッパーなのか不明。（polynetworkのブリッジ機能を持つもの）
// wrapperContract.methods.lock("0x0000000000000000000000000000000000000103", chainId, toAddress, amount, fee, 0).encodeABI()を
// 本データとして送信することで、WRAPPER_CONTRACT_ADDRが自分のメタマスクアドレスからamount分引き出しロックする。
// その結果として、amountに対応するsepoliaETHがtoAddressへ送られる
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var quorumjs, Web3, web3, WRAPPER_CONTRACT_ADDR, WRAPPER_ABI, fromAccount, wrapperContract, chainId, toAddress, amount, fee, lockCode, nonce, PRIVATE_KEY;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    quorumjs = require("quorum-js");
                    Web3 = require("web3");
                    web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"));
                    quorumjs.extend(web3);
                    WRAPPER_CONTRACT_ADDR = "0xdF539255E823b9D08aAD0b7D7b89868246f65B5a" // https://github.com/polynetwork/docs/blob/master/config/README_TestNet.md#BCS-Palette-2
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
                    ;
                    fromAccount = "0xCD985714a3A3c764dFE2c14f5B8a2480De3F3Bb4" // 自分のメタマスク
                    ;
                    wrapperContract = new web3.eth.Contract(WRAPPER_ABI, WRAPPER_CONTRACT_ADDR);
                    chainId = 602 // onchainさんから伝えられたPolyChainID
                    ;
                    toAddress = "0xA0b06BF06b3Df01E5a18ED72e35c5d4A898E2B3f";
                    amount = web3.utils.toWei('0.0002', 'ether');
                    fee = web3.utils.toWei('0.00001', 'ether');
                    return [4 /*yield*/, wrapperContract.methods.lock("0x0000000000000000000000000000000000000103", chainId, toAddress, amount, fee, 0).encodeABI()];
                case 1:
                    lockCode = _a.sent();
                    console.log('lockCode=' + lockCode);
                    PRIVATE_KEY = Buffer.from("f22585c397340c73a05253897bc442d966e394ad77c3e085c2efdcf67186f11d", "hex") // 自分のメタマスク
                    ;
                    web3.eth.getTransactionCount(fromAccount).then(function (_nonce) {
                        nonce = _nonce.toString(16);
                        console.log("Nonce: " + _nonce);
                        var common = new common_1["default"]({
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
                        });
                        var txParams = {
                            nonce: _nonce,
                            gasPrice: 0,
                            gasLimit: 0,
                            value: 0,
                            to: WRAPPER_CONTRACT_ADDR,
                            data: lockCode
                        };
                        var tx = new tx_1.Transaction(txParams, { common: common }).sign(PRIVATE_KEY);
                        console.log("sign done.");
                        console.log(tx.toJSON());
                        var serializedTx = tx.serialize();
                        console.log("sendSignedTransaction: 0x" + serializedTx.toString('hex'));
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
