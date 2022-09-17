var Token = artifacts.require("./MyToken.sol");
var TokenSale = artifacts.require("./MyTokenSale.sol");
var KycContract= artifacts.require("./KycContract.sol")
require("dotenv").config({path:"../.env"})


module.exports =async function(deployer) {
  const addr = await web3.eth.getAccounts()
  await deployer.deploy(Token,process.env.INITIAL_SUPPLY);
  await deployer.deploy(KycContract);
  await deployer.deploy(TokenSale,1,addr[0],Token.address,KycContract.address);
  let instance = await Token.deployed();
  await instance.transfer(TokenSale.address,process.env.INITIAL_SUPPLY)

};
