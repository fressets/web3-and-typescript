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
    lock_proxy: "0x95a10b809c9Cfd51A46652C785ac73d7269834b9",
    BCS_Palette2_polychainId: 1002,
    Sepolia_chainId: 11155111
};
// 自分のメタマスクアドレスからラッパーコントラクトへトランザクションを送信
// なんのラッパーなのか不明。（polynetworkのブリッジ機能を持つもの）
// wrapperContract.methods.lock("0x0000000000000000000000000000000000000103", chainId, toAddress, amount, fee, 0).encodeABI()を
// 本データとして送信することで、WRAPPER_CONTRACT_ADDRが自分のメタマスクアドレスからamount分引き出しロックする。
// その結果として、amountに対応するsepoliaETHがtoAddressへ送られる
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var quorumjs, Web3, web3, WRAPPER_CONTRACT_ADDR, WRAPPER_ABI, fromAccount, wrapperContract, chainId, toAddress, amount, lockCode, nonce, PRIVATE_KEY, gasLimit, gasPrice, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    quorumjs = require("quorum-js");
                    Web3 = require("web3");
                    web3 = new Web3(new Web3.providers.HttpProvider(e2p.network_endpoint));
                    quorumjs.extend(web3);
                    WRAPPER_CONTRACT_ADDR = e2p.wrapper_contract_address;
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
                    fromAccount = e2p.from_address;
                    wrapperContract = new web3.eth.Contract(WRAPPER_ABI, WRAPPER_CONTRACT_ADDR);
                    chainId = e2p.BCS_Palette2_polychainId;
                    toAddress = e2p.to_address;
                    amount = web3.utils.toWei('0.0001', 'ether');
                    return [4 /*yield*/, wrapperContract.methods.lock(e2p.token_contract_address, chainId, toAddress, amount, 0, 0).encodeABI()];
                case 1:
                    lockCode = _b.sent();
                    console.log('lockCode=' + lockCode);
                    PRIVATE_KEY = Buffer.from(e2p.from_address_priv_key, "hex") // 自分のメタマスク
                    ;
                    return [4 /*yield*/, web3.eth.estimateGas({
                            from: fromAccount,
                            to: WRAPPER_CONTRACT_ADDR,
                            data: lockCode
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
                        var common = new common_1["default"]({ chain: common_2.Chain.Sepolia });
                        var txParams = {
                            nonce: _nonce,
                            gasPrice: gasPrice,
                            gasLimit: gasLimit,
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
