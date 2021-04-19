pragma solidity 0.8.0;


  // @title Verify valid requests and track completed ones.
  // @dev A message is valid only ones.
  // Duplicated messages will result in a second attempt while invalid messages will result in blacklist of the sender.
  // An attempt to use a blacklisted address will result in a loss of the fee.


contract OracleAuthority {


  
  // List of previous messages.
  mapping(bytes32 => bool) internal previousMessages;

  
  // Blacklist of invalid senders.
  mapping(address => bool) internal blacklist;

  
  // Verify the message is not used already.
  // @param _message is the message to verify.
  modifier isPreviousMessage(bytes32 _message) {
    require(!previousMessages[_message], "Message already used");
    _;
  }

  
  // Add the message to previous message list.
  // @param _message is the message to add.
  function setPreviousMessage(bytes32 _message) internal {
    previousMessages[_message] = true;
  }

  
  // Add sender to blacklist.
  // @param _sender is the sender to add.
  function addToBlacklist(address _sender) internal {
    blacklist[_sender] = true;
  }

  
  // Check if sender is blaclisted.
  // @param _sender is the sender to check.
  function isBlacklisted(address _sender) internal view returns (bool) {
    return blacklist[_sender];
  }
}