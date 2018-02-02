var VestingToken = artifacts.require("./VestibleToken.sol")
var VestingContract = artifacts.require("./Vesting.sol");
var amount = 1000;

module.exports = async function (deployer, network, accounts) {
	let token = await deployer.deploy(VestingToken, {
		from: accounts[0]
	});
	let tokenAddress = accounts[0];
	let currentTimestamp = Date.now() / 1000 | 0;
	let vestingContract = await deployer.deploy(VestingContract, tokenAddress, currentTimestamp, {
		from: accounts[1]
	});
	let vestingAddress = accounts[1];
	let tokenInstance = VestingToken.at(tokenAddress);
	tokenInstance.mint(vestingAddress, amount);
};