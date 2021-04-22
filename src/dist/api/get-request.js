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
exports.GetRequest = void 0;
const fetch_h2_1 = require("fetch-h2");
class GetRequest {
    constructor(_baseUrl, _path, _jsonFormat) {
        this.baseUrl = _baseUrl;
        this.path = _path;
        this.jsonFormat = _jsonFormat;
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch_h2_1.fetch(`${this.baseUrl}${this.path}`, {
                    method: 'GET'
                });
                let data = yield response.json();
                if (this.jsonFormat) {
                    for (let i = 0; i < this.jsonFormat.length; i++) {
                        if (data.hasOwnProperty(this.jsonFormat[i])) {
                            data = data[this.jsonFormat[i]];
                        }
                        else {
                            throw ('failed fetch data');
                        }
                    }
                }
                if (data !== undefined)
                    return data;
            }
            catch (error) {
                throw ('error endpoint');
            }
        });
    }
}
exports.GetRequest = GetRequest;
//# sourceMappingURL=get-request.js.map