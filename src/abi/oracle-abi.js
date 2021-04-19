module.exports =
[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "_requestId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "_result",
        "type": "bool"
      }
    ],
    "name": "httpGetBooleanFulFilled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_requester",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "_requestId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_baseUrl",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_path",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string[]",
        "name": "_jsonData",
        "type": "string[]"
      }
    ],
    "name": "httpGetBooleanRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "_requestId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_result",
        "type": "uint256"
      }
    ],
    "name": "httpGetNumberFulFilled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_requester",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "_requestId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_baseUrl",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_path",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string[]",
        "name": "_jsonData",
        "type": "string[]"
      }
    ],
    "name": "httpGetNumberRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "_requestId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_result",
        "type": "uint256"
      }
    ],
    "name": "randomNumberRequestFulFilled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_requester",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "_requestId",
        "type": "bytes32"
      }
    ],
    "name": "randomNumberRequested",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getFeePrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "requestIdList",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "requestRandomNumber",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_h",
        "type": "bytes32"
      },
      {
        "internalType": "uint8",
        "name": "_v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "_r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_s",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_requester",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_result",
        "type": "uint256"
      }
    ],
    "name": "fulfilRandomNumberRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_baseUrl",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_path",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "_jsonData",
        "type": "string[]"
      }
    ],
    "name": "requestHttpGetNumber",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_h",
        "type": "bytes32"
      },
      {
        "internalType": "uint8",
        "name": "_v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "_r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_s",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_requester",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_result",
        "type": "uint256"
      }
    ],
    "name": "fulfilHttpGetNumber",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_baseUrl",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_path",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "_jsonData",
        "type": "string[]"
      }
    ],
    "name": "requestHttpGetBoolean",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_h",
        "type": "bytes32"
      },
      {
        "internalType": "uint8",
        "name": "_v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "_r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_s",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_requester",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_result",
        "type": "bool"
      }
    ],
    "name": "fulfilHttpGetBoolean",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_requester",
        "type": "address"
      }
    ],
    "name": "getRequestId",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fee",
        "type": "uint256"
      }
    ],
    "name": "setOracleFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_oracle",
        "type": "address"
      }
    ],
    "name": "setOracleAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]