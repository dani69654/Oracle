//SPDX-License-Identifier: <SPDX-License>

pragma solidity 0.8.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Context.sol";
import "./system/OracleAuthority.sol";
import "./system/ECDSAVerification.sol";
import "./interfaces/IRequesterContract.sol";

contract Oracle is Ownable, OracleAuthority, ECDSAVerification {

  mapping(address => bytes32) public requestIdList;

  // Random number
  event randomNumberRequested(address _requester, bytes32 _requestId);
  event randomNumberRequestFulFilled(bytes32 _requestId, uint _result);

  // Http get number
  event httpGetNumberRequested(address _requester, bytes32 _requestId, string _baseUrl, string _path, string [] _jsonData);
  event httpGetNumberFulFilled(bytes32 _requestId, uint _result);

  // Http get boolean
  event httpGetBooleanRequested(address _requester, bytes32 _requestId, string _baseUrl, string _path, string [] _jsonData);
  event httpGetBooleanFulFilled(bytes32 _requestId, bool _result);

  /**
    * Request fee verification. 
    */
  modifier costs() {
    require(msg.value >= getFeePrice(), "Missing fee");
    _;
  }

  // == RANDOM NUMBER == //

/**
  * @notice Request a random number.
  *
  * @dev    Emit `randomNumberRequested` event.
  * 
  * @return A request id as bytes32.
  */
  function requestRandomNumber() 
    external 
    returns (bytes32) {
      bytes32 requestId = keccak256(abi.encodePacked(_msgSender(), block.timestamp));
      requestIdList[_msgSender()] = requestId;
      emit randomNumberRequested(_msgSender(), requestId);
      return requestId;
  }

/**
  * @notice Fulfil a random number request.
  * 
  * @dev Verify that the message is coming from the oracle and was not tampered
  *      by matching the signature with the address `ORACLE`.
  *      Verify that the message was not previously used and verify that the sender address 
  *      is not blacklisted.
  *      Emit `randomNumberRequestFulFilled` event.
  *
  * @param _h The hashed message.
  * @param _v Signature V value.
  * @param _r Signature R value.
  * @param _s Signature S value.
  * @param _requester The requester address.
  * @param _result The random number.
  */
  function fulfilRandomNumberRequest(
    bytes32 _h, 
    uint8 _v, 
    bytes32 _r, 
    bytes32 _s, 
    address _requester, 
    uint _result) 
    external 
    isPreviousMessage(_h)
    isBlacklisted(_msgSender()) {

    require(_verify(_h,_v,_r,_s));
    RequesterContract(_requester)._callback(requestIdList[_requester], _result);
    emit randomNumberRequestFulFilled(requestIdList[_requester], _result);
    
  }


  // == HTTP GET NUMBER == //

/**
  * @notice Request HTTP GET request.
  *         Works with HTTP-2 as well.
  *
  * @dev    Emit `httpGetRequestRequested` event.
  * 
  * @return A request id as bytes32.
  */
  function requestHttpGetNumber(
    string memory _baseUrl,
    string memory _path,
    string [] memory _jsonData) 
    external 
    returns (bytes32) {
      bytes32 requestId = keccak256(abi.encodePacked(_msgSender(), block.timestamp));
      requestIdList[_msgSender()] = requestId;
      emit httpGetNumberRequested(_msgSender(), requestId, _baseUrl, _path, _jsonData);
      return requestId;
  }

/**
  * @notice Fulfil an http get request.
  * 
  * @dev Verify that the message is coming from the oracle and was not tampered
  *      by matching the signature with the address `ORACLE`.
  *      Verify that the message was not previously used and verify that the sender address 
  *      is not blacklisted.
  *      Emit `httpGetRequestRequestedFulFilled` event.
  *
  * @param _h The hashed message.
  * @param _v Signature V value.
  * @param _r Signature R value.
  * @param _s Signature S value.
  * @param _requester The requester address.
  * @param _result The result number.
  */
  function fulfilHttpGetNumber(
    bytes32 _h, 
    uint8 _v, 
    bytes32 _r, 
    bytes32 _s, 
    address _requester, 
    uint _result) 
    external 
    isPreviousMessage(_h)
    isBlacklisted(_msgSender()) {

      require(_verify(_h,_v,_r,_s));
      RequesterContract(_requester)._callback(requestIdList[_requester], _result);
      emit httpGetNumberFulFilled(requestIdList[_requester], _result);
    
  }

  // == HTTP GET BOOLEAN == //
  
/**
  * @notice Request HTTP GET request.
  *         Works with HTTP-2 as well.
  *
  * @dev    Emit `httpGetBooleanRequestRequested` event.
  * 
  * @return A request id as bytes32.
  */
  function requestHttpGetBoolean(
    string memory _baseUrl,
    string memory _path,
    string [] memory _jsonData) 
    external 
    returns (bytes32) {
      bytes32 requestId = keccak256(abi.encodePacked(_msgSender(), block.timestamp));
      requestIdList[_msgSender()] = requestId;
      emit httpGetBooleanRequested(_msgSender(), requestId, _baseUrl, _path, _jsonData);
      return requestId;
  }

/**
  * @notice Fulfil an http get request.
  * 
  * @dev Verify that the message is coming from the oracle and was not tampered
  *      by matching the signature with the address `ORACLE`.
  *      Verify that the message was not previously used and verify that the sender address 
  *      is not blacklisted.
  *      Emit `httpGetBooleanRequestFulFilled` event.
  *
  * @param _h The hashed message.
  * @param _v Signature V value.
  * @param _r Signature R value.
  * @param _s Signature S value.
  * @param _requester The requester address.
  * @param _result The result boolean.
  */
  function fulfilHttpGetBoolean(
    bytes32 _h, 
    uint8 _v, 
    bytes32 _r, 
    bytes32 _s, 
    address _requester, 
    bool _result) 
    isPreviousMessage(_h)
    isBlacklisted(_msgSender())
    external {

      require(_verify(_h,_v,_r,_s));
      RequesterContract(_requester)._callback(requestIdList[_requester], _result);
      emit httpGetBooleanFulFilled(requestIdList[_requester], _result);
      
    }

















  /**
    * @notice Get request id for a given requester address.
    */
  function getRequestId(address _requester) public view returns (bytes32){
    return requestIdList[_requester];
  }

  /**
    * @notice Set the oracle fee.
    */
  function setOracleFee(uint _fee) external onlyOwner {
    require(_fee > 0);
    _setOracleFee(_fee);
  }

  /**
    * @notice Set the oracle address.
    */
  function setOracleAddress(address _oracle) external onlyOwner {
    require(_oracle != address(0));
    _setOracleAddress(_oracle);
  }

}