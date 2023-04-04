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
function balanceOf() {
    return __awaiter(this, void 0, void 0, function () {
        var balanceOfABI, Web3, web3, contract;
        return __generator(this, function (_a) {
            balanceOfABI = [
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_owner",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "name": "balance",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
            ];
            Web3 = require("web3");
            web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"));
            contract = new web3.eth.Contract(balanceOfABI, "0x0000000000000000000000000000000000000103");
            console.log(JSON.stringify(contract.events.allEvents()));
            return [2 /*return*/];
        });
    });
}
function setManagerProxy() {
    return __awaiter(this, void 0, void 0, function () {
        var setManagerProxyAbi, Web3, web3, contract;
        return __generator(this, function (_a) {
            setManagerProxyAbi = [
                { "type": "function", "constant": false, "name": "setManagerProxy", "inputs": [{ "name": "ccmp", "type": "address" }], "outputs": [], "payable": false, "stateMutability": "nonpayable" },
            ];
            Web3 = require("web3");
            web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"));
            contract = new web3.eth.Contract(setManagerProxyAbi, "0x0000000000000000000000000000000000000103");
            console.log(JSON.stringify(contract.events.allEvents()));
            return [2 /*return*/];
        });
    });
}
function lock() {
    return __awaiter(this, void 0, void 0, function () {
        var lockAbi, Web3, web3, contract, chainId, toAddress, PRIVATE_KEY, amount, txObject, _a, _b, common, tx, serializedTx;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    lockAbi = [
                        {
                            "constant": false, "inputs": [
                                { "internalType": "uint64", "name": "toChainId", "type": "uint64" },
                                { "internalType": "bytes", "name": "toAddress", "type": "bytes" },
                                { "internalType": "uint256", "name": "amount", "type": "uint256" }
                            ], "name": "lock", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function"
                        }
                    ];
                    Web3 = require("web3");
                    web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"));
                    contract = new web3.eth.Contract(lockAbi, "0x0000000000000000000000000000000000000103");
                    chainId = 602 // onchainさんから伝えられたPolyChainID
                    ;
                    toAddress = "0xA0b06BF06b3Df01E5a18ED72e35c5d4A898E2B3f" // sepoliaのアドレス
                    ;
                    PRIVATE_KEY = Buffer.from("f22585c397340c73a05253897bc442d966e394ad77c3e085c2efdcf67186f11d", "hex") // 自分のメタマスク
                    ;
                    amount = web3.utils.toWei('0.0002', 'ether') // 自分のメタマスクがすでにapproveしている額以下
                    ;
                    _c = {};
                    _b = (_a = web3.utils).toHex;
                    return [4 /*yield*/, web3.eth.getTransactionCount('0xCD985714a3A3c764dFE2c14f5B8a2480De3F3Bb4')];
                case 1:
                    txObject = (_c.nonce = _b.apply(_a, [_d.sent()]),
                        _c.gasPrice = 0,
                        _c.gasLimit = 0,
                        _c.to = '0x0000000000000000000000000000000000000103',
                        _c.value = '0x00',
                        _c.data = contract.methods.lock(chainId, toAddress, amount).encodeABI(),
                        _c);
                    common = new common_1["default"]({
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
                    tx = new tx_1.Transaction(txObject, { common: common }).sign(PRIVATE_KEY);
                    console.log(tx.toJSON());
                    serializedTx = tx.serialize();
                    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
                        .then(function (receipt) {
                        console.log('Lock transaction successful:', receipt);
                    })["catch"](function (error) {
                        console.error('Lock transaction failed:', error);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
lock();
