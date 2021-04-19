pragma solidity 0.8.0;


  // @title Holds the oracle information.

contract OracleData {

  // Fee required to process the oracle request.
  uint private FEE = 0.0001 ether;

  
  // The address that signs the transaction.
  address private ORACLE = 0xE78dC206875373B351EEF2D182025bb9a64d67B3;

  
  // Set the oracle fee.
  // @param _fee The new fee.
  function _setOracleFee(uint _fee) internal {
    FEE = _fee;
  }

 
  // Set the oracle address.
  // @param _oracle The new oracle address.
  function _setOracleAddress(address _oracle) internal {
    ORACLE = _oracle;
  }


  // Get the oracle address.
  // @return The oracle address.
  function _getOracleAddress() internal view returns (address) {
    return ORACLE;
  }

  
  // Get the fee price.
  // @return The fee price.
  function getFeePrice() public view returns (uint) {
    return FEE;
  }
}