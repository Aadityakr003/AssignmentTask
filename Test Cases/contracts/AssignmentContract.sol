// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AssignmentContract is Ownable {

    event SETSTRING(address indexed caller, string data);
    
    // mapping to store every user string
    mapping(address => string) private userString;

    constructor() Ownable(msg.sender)  {}

    modifier validString(string memory _str) {
        require(bytes(_str).length > 0, "String must not be empty");
        _;
    }
    
    /// @notice This function allow user to store a sting message
    /// @param _newString A string that would be stored on Blockchain
    function setString(string calldata _newString) validString(_newString) external returns(bool){
        userString[msg.sender] = _newString;
        emit SETSTRING(msg.sender, _newString);
        return true;
    }
    
    /// @notice This function will return the caller stored sting
    function getString() external view returns(string memory){
        string memory storedString = userString[msg.sender];
        return storedString ;
    }
}