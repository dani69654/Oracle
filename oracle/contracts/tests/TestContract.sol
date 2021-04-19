pragma solidity 0.8.0;

interface Oracle {
  function requestRandomNumber() external payable returns(bytes32);
}


contract TestContract {
  
  bytes32 public result;
  uint public number = 0;

  function callOracle(address _oracleAddress) public {
    Oracle(_oracleAddress).requestRandomNumber();
  }

  function _callback (bytes32 _requestId, uint _result) external {
    result  = _requestId;
    number = _result;
  }
}