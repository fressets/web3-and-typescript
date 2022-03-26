/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX address
 * @return {Boolean}
 */
var isAddress = function (address) {
    // check if it has the basic requirements of an address
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        return false;
        // If it's ALL lowercase or ALL upppercase
    }
    else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
        return true;
        // Otherwise check each case
    }
    else {
        return checkAddressChecksum(address);
    }
};
/**
 * Checks if the given string is a checksummed address
 *
 * @method checkAddressChecksum
 * @param {String} address the given HEX address
 * @return {Boolean}
 */
var checkAddressChecksum = function (address) {
    // Check each case
    address = address.replace(/^0x/i, '');
    var addressHash = sha3(address.toLowerCase()).replace(/^0x/i, '');
    for (var i = 0; i < 40; i++) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};

Ont = require('ontology-ts-sdk');
// ont: ASQa8m9nDuNB4HYbbTt5rN294taNykMhRk
// eth: 0x5B7fB1C0f7713e030C29B41551eA4574b9146fB7
// var address = "ASQa8m9nDuNB4HYbbTt5rN294taNykMhRk";
const addr = new Ont.Crypto.Address("ASQa8m9nDuNB4HYbbTt5rN294taNykMhRk").serialize();
const addr2 = Buffer.from(addr)
console.log(isAddress("0x" + addr))

console.log(addr.toLowerCase());
