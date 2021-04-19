"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oracleContract = void 0;
const web3_1 = require("web3");
const dotenv = require("dotenv");
const oracle_abi_1 = require("../abi/oracle-abi");
dotenv.config();
const contractAddress = "0x0";
const privateKey = process.env['PRIVATE_KET'];
const web3 = new web3_1.default(`https://data-seed-prebsc-1-s1.binance.org:8545`);
exports.oracleContract = new web3.eth.Contract(oracle_abi_1.oracleAbi, contractAddress);
console.log(exports.oracleContract);
//# sourceMappingURL=web3.js.map