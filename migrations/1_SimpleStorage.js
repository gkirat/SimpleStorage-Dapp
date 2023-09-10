const Migrations = artifacts.require("simpleStorage");


module.exports = function (deployer) {
deployer.deploy(Migrations);
};