pragma solidity 0.8.0;


  // @title Verify message and signatures.


import "./OracleData.sol";

contract ECDSAVerification is OracleData {

  
  // Verify the message.
  // @param h Is the message to verify.
  // @param [r,s] Are outputs of the ECDSA signature.
  // @param v Is the recovery id.
  // @return True if valid, false otherwise.

  function _verify(bytes32 h, uint8 v, bytes32 r, bytes32 s) internal returns (bool) {
    bytes32 prefixedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", h));
    address addr = ecrecover(prefixedHash, v, r, s);
    return addr == _getOracleAddress();
  }

}