require('dotenv').config({ path: require('find-config')('.env') });

const Web3 = require("web3");
const oracleAbi = require("../abi/oracle-abi");
const localprovider = new Web3.providers.WebsocketProvider("http://localhost:9545");
const web3 = new Web3(localprovider);
const crypto = require("crypto");

// The oracle contract address.
const contractAddress = "0xafba9088A36f0A4AeA75eD9CFCF79857A7Ab3fdB";

// The signer account.
const account = web3.eth.accounts.privateKeyToAccount(process.env["PRIVATE_KEY"]);

// Contract
const oracleContract = new web3.eth.Contract(oracleAbi, contractAddress);

// Sign the massage.
// @return The signed message and the hasf of the message.
async function signMessage() {
  const message =  crypto.randomBytes(256).toString('hex');
  const hash = web3.utils.soliditySha3(message);
  const result = await account.sign(hash);
  return { result, hash };
}


module.exports = {
  oracleContract,
  signMessage,
  web3
}