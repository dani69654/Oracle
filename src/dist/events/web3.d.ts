import Web3 from "web3";
export declare const web3: Web3;
export declare const oracleContract: import("web3-eth-contract").Contract;
export declare function signMessage(): Promise<{
    result: import("web3-core").Sign;
    hash: string;
}>;
