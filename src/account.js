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
var converter = function (logs) {
    var BN = require("bn.js");
    var tokenEventPrc20TransferSignature = "0xbeabacc8ffedac16e9a60acdb2ca743d80c2ebb44977a93fa8e483c74d2b35a8";
    var tokenEventPrc20ApproveSignature = "0x5c52a5f2b86fd16be577188b5a83ef1165faddc00b137b10285f16162e17792a";
    return logs
        .filter(function (log) { return log.topics && log.topics.length > 2; })
        .map(function (log) {
        var eventSig = log.topics[0];
        var source = "0x".concat(log.topics[1].slice(26, 66));
        var destination = "0x".concat(log.topics[2].slice(26, 66));
        var amount = new BN(log.data.replace("0x", ""), 16).toString();
        var blockNumber = log.blockNumber, blockHash = log.blockHash, transactionHash = log.transactionHash, transactionIndex = log.transactionIndex, address = log.address, logIndex = log.logIndex, removed = log.removed;
        return {
            blockNumber: blockNumber,
            transactionHash: transactionHash,
            transactionIndex: transactionIndex,
            address: address,
            eventSig: eventSig,
            source: source,
            destination: destination,
            amount: amount,
            logIndex: logIndex,
            removed: removed
        };
    })
        .filter(function (log) {
        return log.source == "0x7A3C7a75EF1e44800d75101cb2baa53506559c76"
            || log.destination == "0x7A3C7a75EF1e44800d75101cb2baa53506559c76"
            || log.source == "0x0000000000000000000000000000000000000103"
            || log.destination == "0x0000000000000000000000000000000000000103"
            || log.eventSig == tokenEventPrc20ApproveSignature;
    });
};
var balanceOfABI = [
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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var Web3, web3, account, contract, result, n, _nonce, fromBlock, toBlock, pastLogs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Web3 = require("web3");
                    web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"));
                    account = "0x7A3C7a75EF1e44800d75101cb2baa53506559c76";
                    contract = new web3.eth.Contract(balanceOfABI, "0x0000000000000000000000000000000000000103");
                    return [4 /*yield*/, contract.methods.balanceOf(account).call()];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [4 /*yield*/, web3.eth.getTransactionCount(account, 'pending')];
                case 2:
                    n = _a.sent();
                    console.log("n: " + n);
                    return [4 /*yield*/, web3.eth.getTransactionCount(account)];
                case 3:
                    _nonce = _a.sent();
                    console.log("Nonce: " + _nonce);
                    fromBlock = 1900000;
                    toBlock = 1991412;
                    return [4 /*yield*/, web3.eth.getPastLogs({ fromBlock: fromBlock, toBlock: toBlock, address: ["0x0000000000000000000000000000000000000103"], topics: [] })];
                case 4:
                    pastLogs = _a.sent();
                    converter(pastLogs).forEach(function (row) {
                        console.log(JSON.stringify(row));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
main();
