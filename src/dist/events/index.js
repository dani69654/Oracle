"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenOracle = void 0;
const web3_1 = require("./web3");
const get_request_1 = require("../api/get-request");
const listenOracle = () => {
    web3_1.oracleContract.events.randomNumberRequested()
        .on('data', (r, e) => __awaiter(void 0, void 0, void 0, function* () {
        if (e) {
            console.log(e);
        }
        else {
            console.log(`New request from ${r.returnValues._requester}`);
            const { result, hash } = yield web3_1.signMessage();
            const addresses = yield web3_1.web3.eth.getAccounts();
            yield web3_1.oracleContract.methods.fulfilRandomNumberRequest(hash, result.v, result.r, result.s, r.returnValues._requester, Math.floor(Math.random() * 10000000000))
                .send({ from: addresses[0] });
        }
    }));
    web3_1.oracleContract.events.httpGetNumberRequested()
        .on('data', (r, e) => __awaiter(void 0, void 0, void 0, function* () {
        if (e) {
            console.log(e);
        }
        else {
            console.log(`New request from ${r.returnValues._requester}`);
            const { result, hash } = yield web3_1.signMessage();
            const addresses = yield web3_1.web3.eth.getAccounts();
            const httpGetResult = yield new get_request_1.GetRequest(r.returnValues._baseUrl, r.returnValues._path, r.returnValues._jsonData).get();
            if (typeof httpGetResult !== 'number')
                return;
            yield web3_1.oracleContract.methods.fulfilHttpGetNumber(hash, result.v, result.r, result.s, r.returnValues._requester, httpGetResult)
                .send({ from: addresses[0] });
        }
    }));
    web3_1.oracleContract.events.httpGetBooleanRequested()
        .on('data', (r, e) => __awaiter(void 0, void 0, void 0, function* () {
        if (e) {
            console.log(e);
        }
        else {
            console.log(`New request from ${r.returnValues._requester}`);
            const { result, hash } = yield web3_1.signMessage();
            const addresses = yield web3_1.web3.eth.getAccounts();
            const httpGetResult = yield new get_request_1.GetRequest(r.returnValues._baseUrl, r.returnValues._path, r.returnValues._jsonData).get();
            if (typeof httpGetResult !== 'boolean')
                console.log('wrong type');
            const balanceBefore = yield web3_1.web3.eth.getBalance(addresses[0]);
            const tx = yield web3_1.oracleContract.methods.fulfilHttpGetBoolean(hash, result.v, result.r, result.s, r.returnValues._requester, httpGetResult)
                .send({ from: addresses[0] });
            const balanceAfter = yield web3_1.web3.eth.getBalance(addresses[0]);
            console.log('before', balanceBefore);
            console.log('after', balanceAfter);
            const gasUsed = web3_1.web3.utils.toBN(tx.gasUsed);
            const gasPrice = web3_1.web3.utils.toBN(30000000000);
            console.log(gasUsed.toString());
            console.log(gasPrice.toString());
            const gasNeeded = gasUsed.mul(gasPrice);
            const radable = gasNeeded.toString();
            console.log('Eth for callback:', radable);
        }
    }));
};
exports.listenOracle = listenOracle;
//# sourceMappingURL=index.js.map