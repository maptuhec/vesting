var VestingToken = artifacts.require("./VestibleToken.sol")
var Vesting = artifacts.require("./Vesting.sol")
const utils = require('./utils');
const expectThrow = util.expectThrow;
const currentTime = util.web3Now;
const timeTravel = util.timeTravel

contract('Vesting', function (accounts) {

	var vestingContract;
	var token;
	var amount = 1000
	var tokenAddress = accounts[0];
	var vestingAddress = accounts[1];

	beforeEach(async function () {

		token = await VestingToken.new({
			from: tokenAddress
		})

		var currentTimestamp = Date.now() / 1000 | 0;

		vestingContract = await Vesting.new({
			tokenAddress,
			amount,
			currentTimestamp,
			from: vestingAddress
		})

		token.mint(vestingAddress, amount);
	});

	it("should be owned by owner", async function () {
		let _owner = await vestingContract.owner({
			from: vestingAddress
		});
		assert.strictEqual(_owner, vestingAddress, "contract is not owned by owner");
	});

})