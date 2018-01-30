var VestingToken = artifacts.require("./VestibleToken.sol")
var VestingContract = artifacts.require("./Vesting.sol");
var amount = 1000;

module.exports = async function (deployer, network, accounts) {
	let token = await deployer.deploy(VestingToken);
	let tokenAddress = await token.call();
	let vestingContract = await deployer.deploy(VestingContract, tokenAddress, tokenAddress, Date.now() / 1000 | 0);
	let vestingAddress = await vestingContract.call();
	token.mint(vestingAddress, amount);
};