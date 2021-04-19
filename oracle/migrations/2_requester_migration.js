const Oracle = artifacts.require("Oracle");
const TestContract = artifacts.require("TestContract");

module.exports = async function (deployer) {
  await deployer.deploy(Oracle);
  await deployer.deploy(TestContract);
};
