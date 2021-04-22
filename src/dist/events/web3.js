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
exports.signMessage = exports.oracleContract = exports.web3 = void 0;
require('dotenv').config({ path: require('find-config')('.env') });
const web3_1 = require("web3");
const oracleAbi = require("../abi/oracle-abi");
const crypto = require("crypto");
const localprovider = new web3_1.default.providers.WebsocketProvider("http://localhost:9545");
exports.web3 = new web3_1.default(localprovider);
const contractAddress = "0x8396B8B0b971c6A16b4A75859CAD2EAF3162b6c0";
const account = exports.web3.eth.accounts.privateKeyToAccount(process.env["PRIVATE_KEY"]);
exports.oracleContract = new exports.web3.eth.Contract(oracleAbi, contractAddress);
function signMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        const message = crypto.randomBytes(256).toString('hex');
        const hash = exports.web3.utils.soliditySha3(message);
        const result = account.sign(hash);
        return { result, hash };
    });
}
exports.signMessage = signMessage;
//# sourceMappingURL=web3.js.map