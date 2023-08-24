const Marriage = artifacts.require("Marriage");

module.exports = function (deployer) {
  deployer.deploy(Marriage);
};
