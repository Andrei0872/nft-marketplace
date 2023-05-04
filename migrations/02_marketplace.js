const Marketplace = artifacts.require("Marketplace");
const BearNft = artifacts.require("BearNft");
const SquirrelNft = artifacts.require("SquirrelNft");

module.exports = function (deployer) {
  deployer.deploy(Marketplace);
  deployer.deploy(BearNft);
  deployer.deploy(SquirrelNft);
};