require('dotenv').config({ path: require('find-config')('.env') });

const Web3 = require("web3");
const oracleAbi = require("../abi/oracle-abi");
const localprovider = new Web3.providers.WebsocketProvider("http://localhost:9545");
export const web3 = new Web3(localprovider);
const crypto = require("crypto");

// The oracle contract address.
const contractAddress = "0x8396B8B0b971c6A16b4A75859CAD2EAF3162b6c0";

// The signer account.
const account = web3.eth.accounts.privateKeyToAccount(process.env["PRIVATE_KEY"]);

// Contract
export const oracleContract = new web3.eth.Contract(oracleAbi, contractAddress);

// Sign the massage.
// @return The signed message and the hasf of the message.
export async function signMessage() {
  const message =  crypto.randomBytes(256).toString('hex');
  const hash = web3.utils.soliditySha3(message);
  const result = await account.sign(hash);
  return { result, hash };
}