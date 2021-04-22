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
  oracleContract.events.httpGetNumberRequested()
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
  oracleContract.events.httpGetBooleanRequested()
  .on('data', async (r,e) => {
    if(e) {
      console.log(e);
    } else {
      console.log(`New request from ${r.returnValues._requester}`);
      const { result, hash } = await signMessage();
      const addresses = await web3.eth.getAccounts();
      const httpGetResult = await new GetRequest(r.returnValues._baseUrl,r.returnValues._path,r.returnValues._jsonData).get();
      if(typeof httpGetResult !== 'boolean') console.log('wrong type')

      const balanceBefore = await web3.eth.getBalance(addresses[0])
      const tx = await oracleContract.methods.fulfilHttpGetBoolean(
        hash,
        result.v,
        result.r, 
        result.s, 
        r.returnValues._requester, 
        httpGetResult)
        .send({ from: addresses[0] });
      
      const balanceAfter = await web3.eth.getBalance(addresses[0])

      console.log('before', balanceBefore)
      console.log('after', balanceAfter)


      //console.log(tx)
      const gasUsed = web3.utils.toBN(tx.gasUsed);
      const gasPrice = web3.utils.toBN(30000000000) //web3.utils.toBN(await web3.eth.getGasPrice());

      console.log(gasUsed.toString());
      console.log(gasPrice.toString())

      const gasNeeded = gasUsed.mul(gasPrice);

      const radable = gasNeeded.toString();
      console.log('Eth for callback:', radable)
      
    }
  });
}

module.exports = listenOracle;