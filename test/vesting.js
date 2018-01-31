var VestingToken = artifacts.require("./VestibleToken.sol")
var Vesting = artifacts.require("./Vesting.sol")
const utils = require('./utils');
const expectThrow = utils.expectThrow;
const currentTime = utils.web3Now;
const timeTravel = utils.timeTravel

contract('Vesting', function (accounts) {

	var vestingContract;
	var token;
	var amount = 1000
	var tokenOwnerAddress = accounts[0];
	var contractOwnerAddress = accounts[1];

	beforeEach(async function () {

		token = await VestingToken.new({
			from: tokenOwnerAddress
		})

		var currentTimestamp = Date.now() / 1000 | 0;

		vestingContract = await Vesting.new(tokenOwnerAddress,
			currentTimestamp, {
				from: contractOwnerAddress
			})

		token.mint(contractOwnerAddress, amount);
	});

	it("should be owned by owner", async function () {
		let _owner = await vestingContract.owner({
			from: contractOwnerAddress
		});
		assert.strictEqual(_owner, contractOwnerAddress, "contract is not owned by owner");
	});

})