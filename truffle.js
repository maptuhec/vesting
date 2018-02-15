var HDWalletProvider = require('truffle-hdwallet-provider');

var MNEMONIC = "unusual coconut pistol sting happy smart exchange volume pottery antenna laundry trumpet";
var INFURA_API_KEY = "Up5uvBHSCSqtOmnlhL87";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropstenInfura: {
      provider: new HDWalletProvider(MNEMONIC, 'https://ropsten.infura.io/' + INFURA_API_KEY),
      network_id: 3,
      gas: 4700036
    }
  }
};