var VestingToken = artifacts.require("./VestibleToken.sol")
var VestingContract = artifacts.require("./Vesting.sol");
var amount = 1000;

module.exports = async function (deployer, network, accounts) {

	await deployer.deploy(VestingToken, {
		from: accounts[0]
	});
	let token = await VestingToken.deployed();
	let tokenAddress = token.address;
	let currentTimestamp = (Date.now() / 1000 | 0);

	await deployer.deploy(VestingContract, tokenAddress, 1518598800, {
		from: accounts[0]
	});
	let vestingContract = await VestingContract.deployed();
	let vestingAddress = vestingContract.address;
	token.mint(vestingAddress, amount);
};