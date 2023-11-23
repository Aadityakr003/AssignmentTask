const { expect } = require("chai");
const { ethers } = require("hardhat");

const contractPath = "contracts/AssignmentContract.sol:AssignmentContract";

describe("\n### Assignment Contract ###\n\n1. Deploy Assignment Contract", function () {
  let assignmentContract, owner, addr1, addr2, addr3;

  beforeEach(async function () {
    const assignmentFactory = await ethers.getContractFactory(contractPath);
    assignmentContract = await assignmentFactory.deploy();
    await assignmentContract.waitForDeployment();
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
  });

  describe("1.1. Check basic info", function () {
    it("Should return correct owner", async function () {
      expect(await assignmentContract.owner()).to.equal(owner.address);
    });
  });

  describe("1.2. Transfer Ownership", function () {
    it("Should allow owner to transfer contract ownership", async function () {
      await assignmentContract.connect(owner).transferOwnership(addr1.address);
      expect(await assignmentContract.owner()).to.equal(addr1.address);
    });

    it("Should revert if any user try to transfer contract ownership", async function () {
        await expect(assignmentContract.connect(addr2).transferOwnership(addr2.address)
          ).to.be.reverted   
    });
  });


});
