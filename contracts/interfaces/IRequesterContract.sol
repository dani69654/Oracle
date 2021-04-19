// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title Interface of the oracle callback functions.
 */
interface RequesterContract {

  function _callback(bytes32, uint) external;
  function _callback(bytes32, bool) external;
}
