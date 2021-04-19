const testContractAddress = "0xE008DDf09dF6A07e62Fc4027Ab8880E2846c08b2";
const oracleAddress = "0xeFA8aFF9De1E81D0aF0632cB7d3669f50f597C44";
const Web3 = require("web3");
const testAbi = require("../abi/test-abi");
var Accounts = require('web3-eth-accounts');

const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");


// Test Contract
const testContract = new web3.eth.Contract(testAbi, testContractAddress);



async function call() {
  var accounts = await new Accounts('http://127.0.0.1:9545');
  console.log(accounts)

  const tx = await web3.eth.accounts.signTransaction({
    to: oracleAddress,

  });
  console.log(tx)
}
call()