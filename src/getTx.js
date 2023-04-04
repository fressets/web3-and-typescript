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
// [1972945,"0x47ffe7e5d3b5ae9756cb0f297cb374c3d285eee2f1e46399e70ff40b74b8abcf",3,"0x0000000000000000000000000000000000000103","0xbeabacc8ffedac16e9a60acdb2ca743d80c2ebb44977a93fa8e483c74d2b35a8","0x1612bdb131445f48d1ad0ec522a7a3be5d77d8a5","0xcd985714a3a3c764dfe2c14f5b8a2480de3f3bb4","5000000000000000000",0,false]
// [1972973,"0x11db135bd80cf25f6fabba19f4b495f35a42da6c664ce14c4bd61517d43c0e46",1,"0x0000000000000000000000000000000000000103","0xbeabacc8ffedac16e9a60acdb2ca743d80c2ebb44977a93fa8e483c74d2b35a8","0x1612bdb131445f48d1ad0ec522a7a3be5d77d8a5","0xcd985714a3a3c764dfe2c14f5b8a2480de3f3bb4","5000000000000000000",0,false]
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var Web3, web3, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Web3 = require("web3");
                    web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"));
                    return [4 /*yield*/, web3.eth.getTransactionReceipt("0x41b982f1e01abe6d1da8ff717a55a64f47a19b2102215758f5c3fc95b92511fd")
                        // web3.eth.getTransactionReceipt("0x962945260a0a293b9c8dab23d17a0ea95a7f691fdf56133fcea27e1cf54b7ca7").then(console.log)
                    ];
                case 1:
                    res = _a.sent();
                    // web3.eth.getTransactionReceipt("0x962945260a0a293b9c8dab23d17a0ea95a7f691fdf56133fcea27e1cf54b7ca7").then(console.log)
                    console.log(JSON.stringify(res));
                    return [2 /*return*/];
            }
        });
    });
}
main();
