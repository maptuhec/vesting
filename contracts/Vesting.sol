pragma solidity ^0.4.18;
import '../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol';

contract Vesting is Ownable {
	address public owner;
	address public tokenAddress;
	uint256 public startDate;
	uint256 public tokenBalance;

	//First half of the year is 182 and the second is 183
	uint256 public firstHalf = 60 * 60 * 24 * 182;
	uint256 public secondHalf = 60 * 60 * 24 * 183;
	uint256 public firstPeriod = firstHalf;
	uint256 public secondPeriod = firstPeriod + secondHalf;
	uint256 public thirdPeriod = secondPeriod + firstHalf;
	uint256 public fourthPeriod = thirdPeriod + secondHalf;
	uint256 public fifthPeriod = fourthPeriod + firstHalf;

	event LogTransferSuccessful(address recepient, uint amount);

	function Vesting(address _tokenAddress, uint256 _startDate ) public {
		require(_tokenAddress > address(0));
		require(_startDate > 0);
		tokenAddress = _tokenAddress;
		startDate = _startDate;
	}

	function claim() public payable onlyOwner {
		require(tokenAddress.balance > 0);
		
		if (tokenBalance < 0) {
			tokenBalance = tokenAddress.balance;
			uint256 firstPeriodTokens = tokenBalance * 20 / 100;
			uint256 secondPeriodTokens = tokenBalance * 20 / 100;
			uint256 thirdPeriodTokens = tokenBalance * 20 / 100;
			uint256 fourthPeriodTokens = tokenBalance * 20 / 100;
			uint256	fifthPeriodTokens = tokenBalance * 20 / 100;
		}
		if (now < startDate + firstPeriod) {
			owner.transfer(firstPeriodTokens);
			LogTransferSuccessful(owner, firstPeriodTokens);
			return;
		}

		if (now < startDate + secondPeriod && now > startDate + firstPeriod ) {
			owner.transfer(secondPeriodTokens);
			LogTransferSuccessful(owner, secondPeriodTokens);
			return;
		}

		if (now < startDate + thirdPeriod && now > startDate + secondPeriod) {
			owner.transfer(thirdPeriodTokens);
			LogTransferSuccessful(owner, thirdPeriodTokens);
			return;
		}

		if (now < startDate + fourthPeriod && now > startDate + thirdPeriod) {
			owner.transfer(fourthPeriodTokens);
			LogTransferSuccessful(owner, fourthPeriodTokens);
			return;
		}

		if (now < startDate + fifthPeriod && now > startDate + fourthPeriod) {
			owner.transfer(fifthPeriodTokens);
			LogTransferSuccessful(owner, fourthPeriodTokens);
			return;
		} 
		if (now > startDate + fifthPeriod) {
			owner.transfer(tokenBalance);
			LogTransferSuccessful(owner, tokenBalance);
			return;
		}
	}
}