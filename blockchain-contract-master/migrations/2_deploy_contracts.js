var StringUtils = artifacts.require('./StringUtils.sol');
var Supply = artifacts.require("./Supply.sol");
var Flight = artifacts.require("./Flight.sol");
var PartPool = artifacts.require("./PartPool.sol");

module.exports = function(deployer) {
  deployer.deploy(StringUtils);
  deployer.link(StringUtils, PartPool);
  deployer.deploy(Flight);
  deployer.deploy(PartPool);
  deployer.link(Flight, Supply);
  deployer.link(PartPool, Supply);
  deployer.deploy(Supply);
};