const { 
  oracleContract,
  signMessage,
  web3
} = require ('./web3');

const listenOracle = () => {

  // RANDOM NUMBER
  oracleContract.events.randomNumberRequested()
  .on('data', async (r,e) => {
    if(e) {
      console.log(e);
    } else {
      console.log('New request found: ')
      console.log(`Requester address ${r.returnValues._requester}`);
      console.log(`Request id ${r.returnValues._requestId}`);

      // Generate random number and send it to the oracle contract.
      const { result, hash } = await signMessage();
      console.log(result)
      console.log(hash)
      const addresses = await web3.eth.getAccounts();
      const receipt = await oracleContract.methods.fulfilRandomNumberRequest(
        hash,
        result.v,
        result.r, 
        result.s, 
        r.returnValues._requester, 
        Math.floor(Math.random() * 10000000000))
        .send({ from: addresses[0] });
    }
  });


  // HTTP GET REQUEST NUMBER
  
}

listenOracle()
module.exports = listenOracle;