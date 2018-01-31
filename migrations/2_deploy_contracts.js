var VestingToken = artifacts.require("./VestibleToken.sol")
var VestingContract = artifacts.require("./Vesting.sol");
var amount = 1000;

module.exports = async function (deployer, network, accounts) {
	let token = await deployer.deploy(VestingToken);
	let tokenAddress = await token.address;
	let currentTimestamp = Date.now() / 1000 | 0;
	let vestingContract = await deployer.deploy(VestingContract, tokenAddress, currentTimestamp);
	let vestingAddress = await vestingContract.address;
	token.mint(vestingAddress, amount);
};