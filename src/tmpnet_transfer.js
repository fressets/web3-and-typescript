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
exports.__esModule = true;
var ethereumjs_common_1 = require("ethereumjs-common");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var Web3, Tx, web3, CONTRACT_ADDR, ABI, PRIVATE_KEY, account, contract, bytes, method, code, nonce;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Web3 = require("web3");
                    Tx = require('ethereumjs-tx').Transaction;
                    web3 = new Web3(new Web3.providers.HttpProvider("http://18.182.239.137:22000"));
                    console.log("task start.");
                    CONTRACT_ADDR = "0x0c5c0b03e897e7b1828f2bc923ea4498ec891060" // Wrapper contract on tmpnet
                    ;
                    ABI = [
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
                    ];
                    PRIVATE_KEY = Buffer.from("39185b5aa1494ada9e9e22f91c793e4c7dd106deafc9fc0ab3198774aeec22cb", "hex");
                    account = "0x6c9931f85d8efa2ab83eb6f11626df43cfb616f6";
                    contract = new web3.eth.Contract(ABI, CONTRACT_ADDR);
                    bytes = "5B7fB1C0f7713e030C29B41551eA4574b9146fB7";
                    console.log(bytes);
                    method = contract.methods.lock("0x0000000000000000000000000000000000000103", 2, "0x" + bytes, 300000000000000, 100000000000000, 1001);
                    return [4 /*yield*/, method.encodeABI()];
                case 1:
                    code = _a.sent();
                    console.log('code=' + code);
                    web3.eth.getTransactionCount(account).then(function (_nonce) {
                        nonce = _nonce.toString(16);
                        console.log("Nonce: " + nonce);
                        var customCommon = ethereumjs_common_1["default"].forCustomChain('mainnet', {
                            name: 'tmpnet',
                            networkId: 104,
                            chainId: 104
                        }, 'petersburg');
                        var txParams = {
                            chainId: '0x3',
                            nonce: '0x' + nonce,
                            gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
                            gasLimit: web3.utils.toHex(300000),
                            value: web3.utils.toHex(web3.utils.toWei("300000000000000", "wei")),
                            from: account,
                            to: CONTRACT_ADDR,
                            data: code
                        };
                        console.log(txParams.gasPrice);
                        var tx = new Tx(txParams);
                        tx.sign(PRIVATE_KEY);
                        console.log("sign done.");
                        var serializedTx = tx.serialize();
                        console.log("send tx");
                        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', function (receipt) {
                            console.log(receipt);
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
main();
