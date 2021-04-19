const { 
  oracleContract,
  signMessage,
  web3
} = require ('./web3');

const GetRequest = require ('../api/get-request');


const listenOracle = () => {

  // RANDOM NUMBER
  oracleContract.events.randomNumberRequested()
  .on('data', async (r,e) => {
    if(e) {
      console.log(e);
    } else {
      console.log(`New request from ${r.returnValues._requester}`);
      // Generate random number and send it to the oracle contract.
      const { result, hash } = await signMessage();
      const addresses = await web3.eth.getAccounts();
      await oracleContract.methods.fulfilRandomNumberRequest(
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
  oracleContract.events.httpGetNumberFulFilled()
  .on('data', async (r,e) => {
   
    if(e) {
      console.log(e);
    } else {
      console.log(`New request from ${r.returnValues._requester}`);
      const { result, hash } = await signMessage();
      const addresses = await web3.eth.getAccounts();
      const httpGetResult = await new GetRequest(r.returnValues._baseUrl,r.returnValues._path,r.returnValues._jsonData).get();
      if(typeof httpGetResult !== 'number') return;
      await oracleContract.methods.fulfilHttpGetNumber(
        hash,
        result.v,
        result.r, 
        result.s, 
        r.returnValues._requester, 
        httpGetResult)
        .send({ from: addresses[0] });
    }
  });

  // HTTP GET REQUEST BOOLEAN
  oracleContract.events.httpGetBooleanFulFilled()
  .on('data', async (r,e) => {
   
    if(e) {
      console.log(e);
    } else {
      console.log(`New request from ${r.returnValues._requester}`);
      const { result, hash } = await signMessage();
      const addresses = await web3.eth.getAccounts();
      const httpGetResult = await new GetRequest(r.returnValues._baseUrl,r.returnValues._path,r.returnValues._jsonData).get();
      if(typeof httpGetResult !== 'boolean') return;
      await oracleContract.methods.fulfilHttpGetBoolean(
        hash,
        result.v,
        result.r, 
        result.s, 
        r.returnValues._requester, 
        httpGetResult)
        .send({ from: addresses[0] });
    }
  });
}

module.exports = listenOracle;