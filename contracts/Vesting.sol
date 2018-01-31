pragma solidity ^0.4.18;
import '../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol';

contract Vesting is Ownable {
	address public owner;
	address public tokenAddress;
	bytes32 public startDate;

	//First half of the year is 182 and the second is 183
	uint256 public firstHalf = 60 * 60 * 24 * 182;
	uint256 public secondHalf = 60 * 60 * 24 * 183;
	uint256 public firstPeriod = firstHalf;
	uint256 public secondPeriod = firstPeriod + secondHalf;
	uint256 public thirdPeriod = secondPeriod + firstHalf;
	uint256 public fourthPeriod = thirdPeriod + secondHalf;
	uint256 public fifthPeriod = fourthPeriod + firstHalf;
	
	//TODO Add requires
	function Vesting(address _tokenAddress, bytes32 _startDate ) public {
		owner = msg.sender;
		tokenAddress = _tokenAddress;
		startDate = _startDate;
	}

	//TODO Make conditions to check in which period the claims is called and transfer the tokens
	function claim() public payable onlyOwner {

	}
}