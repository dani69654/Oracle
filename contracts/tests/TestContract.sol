pragma solidity 0.8.0;

interface OracleInteface {
  function requestRandomNumber() external payable returns(bytes32);
  function requestHttpGet(
    string memory _baseUrl,
    string memory _path,
    string [] memory _jsonData
  ) external payable returns(bytes32);

  function requestHttpGetBoolean(
    string memory _baseUrl,
    string memory _path,
    string [] memory _jsonData
  ) external returns(bytes32);

}


contract TestContract {
  
  bytes32 public result;
  uint public number = 0;

  bool public resultBool = true;


  function callOracle(address _oracleAddress) public {
    OracleInteface(_oracleAddress).requestRandomNumber();
  }

  function _callback (bytes32 _requestId, uint _result) external {
    result  = _requestId;
    number = _result;
  }

  function _callback (bytes32 _requestId, bool _result) external {
    resultBool = _result;
  }

  function newHttpGet(address _oracleAddress, string [] memory _data) public {
    result = OracleInteface(_oracleAddress).requestHttpGet('https://api.coingecko.com/api/v3','/simple/price?ids=bitcoin&vs_currencies=usd',_data);
  }


  function httpBoolean(address _oracleAddress, string [] memory _data) public {
    result = OracleInteface(_oracleAddress).requestHttpGetBoolean('https://academy-certificates.herokuapp.com/','api/v1/certificates/QmZymaPPQGytwmBGhjbYCKTU9zZJ2Utg76Bj9nh4baxkeCd',_data);
  }
}