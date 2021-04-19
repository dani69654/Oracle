const Requester = artifacts.require("Requester");
const truffleAssert = require("truffle-assertions");
const Web3 = require('web3');
const env = require('dotenv').config()
const ethers = require('ethers');
var crypto = require("crypto");

contract("JailBreak", (accounts) => {

  const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545';
  let oracle;
  var web3;
  before( async () => {
    oracle = await Requester.new();
    web3 = new Web3(new Web3.providers.HttpProvider(provider));
  })

  it("Should confirm a uint request", async () => {
    const tx = await oracle.acceptUintRequest({value: web3.utils.toWei("0.0001")});
    const result = await oracle.getRequestId(accounts[0]);
    truffleAssert.eventEmitted(tx, 'UintRequest', (ev) => {
      return (ev._requester == accounts[0], ev._requestId == result);
    });
  })

  it('Should sign a message', async () => {
    const account = web3.eth.accounts.privateKeyToAccount(env.parsed.PRIVATE_KEY);

    const message = crypto.randomBytes(256).toString('hex');

    const result = await account.sign(message);
    console.log(message)

    // const r = await oracle.testRecovery(message,result.v,result.r, result.s)
    // console.log(r)
  })

  

})
