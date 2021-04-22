pragma solidity 0.8.0;

/**
  * @notice Handle the fees required to request data.
  *        
  * @dev The requester will pay the fees to transact with the oracle,
  *      however we also want the requester to pay the fees for the 
  *      callback and we want this to be as cheap as possibile.
  *      This contract will make sure that the Oracle knows how much fee
  *      the user has to pay.
  *      The function `calculateGas` must be called before any other function,
  *      it will request the gas amount to the oracle that will then require it
  *      as transaction fee.
  *      This contract makes sure that the user cannot call the oracle without
  *      knowing the fee to charge.
  *      Because of the fluctuation in gas price, this contract timelock the fee for 30 seconds only.
  *      The user will have to request the fee again if the timelock is expired.
  */
contract GasCalculator {

  
  // The timelock time is 30 seconds.
  uint private constant TIME_LOCK = 30 seconds;

  // mapping user => gas price.
  mapping(address => uint) internal gasUser;

  // mapping user => timelock.
  mapping(address => uint) internal gasTimelock;

  // Price requested even.
  event GasPriceRequested(address _requester);



  function requestPrice() public {
    emit gasPriceRequested(msg.sender);
  }



  /**
    * Verify the gas request timelock.
    * @return true if timelock is valid, false otherwise.
    */
  function _isGasValid() internal view returns (bool) {
    return block.timestamp < gasTimelock[msg.sender];
  }

  /**
    * Set timelock for gas request.
    */
  function _setTimeLock() internal {
    gasTimelock[msg.sender] = block.timestamp + TIME_LOCK;
  }
}