const express = require("express");
const app = express();
const PORT = "4000";

const GetRequest  = require ('./api/get-request');
const listenOracle = require('./events/index')


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  listenOracle()
  // let answer = await new GetRequest('https://api.coingecko.com/api/v3','/simple/price?ids=bitcoin&vs_currencies=usd',['bitcoin','usd']).get();
  // console.log(answer);
  //  answer = await new GetRequest('https://api.coingecko.com/api/v3','/coins/bitcoin',['block_time_in_minutes']).get()
  // console.log(answer);
});