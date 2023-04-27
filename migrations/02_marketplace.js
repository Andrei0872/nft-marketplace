const Marketplace = artifacts.require("Marketplace");
const BearNft = artifacts.require("BearNft");

module.exports = function (deployer) {
  deployer.deploy(Marketplace);
  deployer.deploy(BearNft);
};