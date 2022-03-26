import Web3 from "web3";

async function main() {
  const Web3 = require("web3");
  // const web3 = new Web3('wss://ropsten.infura.io/ws/v3/9986cb2f179c40ae8c5bf317ec2154ac');
  const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9986cb2f179c40ae8c5bf317ec2154ac"))
  const contract = new web3.eth.Contract([
                                         	{
                                         		"inputs": [],
                                         		"name": "get",
                                         		"outputs": [
                                         			{
                                         				"internalType": "string",
                                         				"name": "",
                                         				"type": "string"
                                         			}
                                         		],
                                         		"stateMutability": "pure",
                                         		"type": "function"
                                         	},
                                         	{
                                         		"inputs": [],
                                         		"name": "greet",
                                         		"outputs": [
                                         			{
                                         				"internalType": "string",
                                         				"name": "",
                                         				"type": "string"
                                         			}
                                         		],
                                         		"stateMutability": "view",
                                         		"type": "function"
                                         	}
                                         ], "0xeF8984664b9e286F9B498cBe32fb63Dd398090b4");

  console.log("send query")
  await contract.methods.get().call().then(result => console.log(result))
}

main();