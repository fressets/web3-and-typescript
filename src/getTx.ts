import Web3 from "web3";

// [1972945,"0x47ffe7e5d3b5ae9756cb0f297cb374c3d285eee2f1e46399e70ff40b74b8abcf",3,"0x0000000000000000000000000000000000000103","0xbeabacc8ffedac16e9a60acdb2ca743d80c2ebb44977a93fa8e483c74d2b35a8","0x1612bdb131445f48d1ad0ec522a7a3be5d77d8a5","0xcd985714a3a3c764dfe2c14f5b8a2480de3f3bb4","5000000000000000000",0,false]
// [1972973,"0x11db135bd80cf25f6fabba19f4b495f35a42da6c664ce14c4bd61517d43c0e46",1,"0x0000000000000000000000000000000000000103","0xbeabacc8ffedac16e9a60acdb2ca743d80c2ebb44977a93fa8e483c74d2b35a8","0x1612bdb131445f48d1ad0ec522a7a3be5d77d8a5","0xcd985714a3a3c764dfe2c14f5b8a2480de3f3bb4","5000000000000000000",0,false]

async function main() {
    const Web3 = require("web3");
    const web3 = new Web3(new Web3.providers.HttpProvider("http://100.20.221.48:22000"))
    // web3.eth.getTransaction("0x4d9c3d0fd1a2e5897754352ec446c284045faa558b366e7992bfa617406766f3").then(console.log)
    // web3.eth.getTransaction("0x962945260a0a293b9c8dab23d17a0ea95a7f691fdf56133fcea27e1cf54b7ca7").then(console.log)

    const res = await web3.eth.getTransactionReceipt("0x41b982f1e01abe6d1da8ff717a55a64f47a19b2102215758f5c3fc95b92511fd")
    // web3.eth.getTransactionReceipt("0x962945260a0a293b9c8dab23d17a0ea95a7f691fdf56133fcea27e1cf54b7ca7").then(console.log)

    console.log(JSON.stringify(res))
}

main()