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
	var tokenInstance;
	const day = 24 * 60 * 60;
	const firstHalf = 60 * 60 * 24 * 182;
	const secondHalf = 60 * 60 * 24 * 183;
	const firstPeriod = firstHalf;
	const secondPeriod = firstPeriod + secondHalf;
	const thirdPeriod = secondPeriod + firstHalf;
	const fourthPeriod = thirdPeriod + secondHalf;
	const fifthPeriod = fourthPeriod + firstHalf;

	beforeEach(async function () {

		token = await VestingToken.new({
			from: tokenOwnerAddress
		})

		var currentTimestamp = Date.now() / 1000 | 0;
		vestingContract = await Vesting.new(token.address,
			currentTimestamp, {
				from: contractOwnerAddress
			})
		token.mint(vestingContract.address, amount);
	});

	it("should be owned by owner", async function () {
		let _owner = await vestingContract.owner({
			from: contractOwnerAddress
		});
		console.log(vestingContract.owner);
		assert.strictEqual(_owner, contractOwnerAddress, "contract is not owned by owner");
	});

	// Claim function tests
	it("should transfer the tokens to the owner for the first period", async function () {
		let initialOwnerBalance = await token.balanceOf(contractOwnerAddress);
		console.log(initialOwnerBalance);
		await timeTravel(web3, day);
		await vestingContract.claim({
			from: contractOwnerAddress
		});

		let finalOwnerBalance = await token.balanceOf(tokenOwnerAddress);
		console.log(finalOwnerBalance);
		assert.equal(finalOwnerBalance.toString(), initialOwnerBalance.toString() - 200, "The transfer wasn't successful")
	})

	// it("should transfer the tokens to the owner for the second period", async function () {
	// 	let initialOwnerBalance = web3.eth.getBalance(contractOwnerAddress).toNumber();
	// 	await timeTravel(web3, firstPeriod + day);
	// 	await vestingContract.claim({
	// 		from: contractOwnerAddress
	// 	});
	// 	assert.equal(web3.eth.getBalance(contractOwnerAddress).toNumber(), initialOwnerBalance + 200, "The transfer wasn't successful")
	// })

	// it("should transfer the tokens to the owner for the third period", async function () {
	// 	let initialOwnerBalance = web3.eth.getBalance(contractOwnerAddress).toNumber();
	// 	await timeTravel(web3, secondPeriod + day);
	// 	await vestingContract.claim({
	// 		from: contractOwnerAddress
	// 	});
	// 	assert.equal(web3.eth.getBalance(contractOwnerAddress).toNumber(), initialOwnerBalance + 200, "The transfer wasn't successful")
	// })

	// it("should transfer the tokens to the owner for the fourth period", async function () {
	// 	let initialOwnerBalance = web3.eth.getBalance(contractOwnerAddress).toNumber();
	// 	await timeTravel(web3, thirdPeriod + day);
	// 	await vestingContract.claim({
	// 		from: contractOwnerAddress
	// 	});
	// 	assert.equal(web3.eth.getBalance(contractOwnerAddress).toNumber(), initialOwnerBalance + 200, "The transfer wasn't successful")
	// })

	// it("should transfer the tokens to the owner for the fifth period", async function () {
	// 	let initialOwnerBalance = web3.eth.getBalance(contractOwnerAddress).toNumber();
	// 	await timeTravel(web3, fourthPeriod + day);
	// 	await vestingContract.claim({
	// 		from: contractOwnerAddress
	// 	});
	// 	assert.equal(web3.eth.getBalance(contractOwnerAddress).toNumber(), initialOwnerBalance + 200, "The transfer wasn't successful")
	// })

	// it("should transfer the tokens to the owner for the end of the period", async function () {
	// 	let initialOwnerBalance = web3.eth.getBalance(contractOwnerAddress).toNumber();
	// 	await timeTravel(web3, fifthPeriod + day);
	// 	await vestingContract.claim({
	// 		from: contractOwnerAddress
	// 	});
	// 	assert.equal(web3.eth.getBalance(contractOwnerAddress).toNumber(), initialOwnerBalance + 1000, "The transfer wasn't successful")
	// })

	// //Event Tests
	// it("should emit one event if transfer for the first period is successful", async function () {
	// 	const expectedEvent = 'LogTransferSuccessful'
	// 	await timeTravel(web3, day);
	// 	let result = await vestingContract.claim({
	// 		from: contractOwnerAddress
	// 	});
	// 	assert.lengthOf(result.logs, 1, "There should be 1 event emitted from claiming the tokens !");
	// 	assert.strictEqual(result.logs[0].event, expectedEvent, `The event emitted was ${result.logs[0].event} instead of ${expectedEvent}`);
	// })

	// it("should emit one event if transfer for the second period is successful", async function () {
	// 	const expectedEvent = 'LogTransferSuccessful'
	// 	await timeTravel(web3, firstPeriod + day);
	// 	let result = await vestingContract.claim({
	// 		from: contractOwnerAddress
	// 	});
	// 	assert.lengthOf(result.logs, 1, "There should be 1 event emitted from claiming the tokens !");
	// 	assert.strictEqual(result.logs[0].event, expectedEvent, `The event emitted was ${result.logs[0].event} instead of ${expectedEvent}`);
	// })
	// it("should emit one event if transfer for the third period is successful", async function () {
	// 	const expectedEvent = 'LogTransferSuccessful'
	// 	await timeTravel(web3, secondPeriod + day);
	// 	let result = await vestingContract.claim({
	// 		from: contractOwnerAddress
	// 	});
	// 	assert.lengthOf(result.logs, 1, "There should be 1 event emitted from claiming the tokens !");
	// 	assert.strictEqual(result.logs[0].event, expectedEvent, `The event emitted was ${result.logs[0].event} instead of ${expectedEvent}`);
	// })

	// it("should emit one event if transfer for the fourth period is successful", async function () {
	// 	const expectedEvent = 'LogTransferSuccessful'
	// 	await timeTravel(web3, thirdPeriod + day);
	// 	let result = await vestingContract.claim({
	// 		from: contractOwnerAddress
	// 	});
	// 	assert.lengthOf(result.logs, 1, "There should be 1 event emitted from claiming the tokens !");
	// 	assert.strictEqual(result.logs[0].event, expectedEvent, `The event emitted was ${result.logs[0].event} instead of ${expectedEvent}`);
	// })

	// it("should emit one event if transfer for the fifth period is successful", async function () {
	// 	const expectedEvent = 'LogTransferSuccessful'
	// 	await timeTravel(web3, fourthPeriod + day);
	// 	let result = await vestingContract.claim({
	// 		from: contractOwnerAddress
	// 	});
	// 	assert.lengthOf(result.logs, 1, "There should be 1 event emitted from claiming the tokens !");
	// 	assert.strictEqual(result.logs[0].event, expectedEvent, `The event emitted was ${result.logs[0].event} instead of ${expectedEvent}`);
	// })

	// it("should emit one event if transfer for beyond the fifth period is successful", async function () {
	// 	const expectedEvent = 'LogTransferSuccessful'
	// 	await timeTravel(web3, fifthPeriod + day);
	// 	let result = await vestingContract.claim({
	// 		from: contractOwnerAddress
	// 	});
	// 	assert.lengthOf(result.logs, 1, "There should be 1 event emitted from claiming the tokens !");
	// 	assert.strictEqual(result.logs[0].event, expectedEvent, `The event emitted was ${result.logs[0].event} instead of ${expectedEvent}`);
	// })

	// //Negative case 

})