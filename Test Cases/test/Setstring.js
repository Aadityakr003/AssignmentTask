const { expect } = require("chai");
const { ethers } = require("hardhat");

const contractPath = "contracts/AssignmentContract.sol:AssignmentContract";

describe("2. String", function () {
  let assignmentContract, owner, addr1, addr2, addr3, addr4, addr5, addr6, addr7, addr8, addr9, addr10, addr11;

  beforeEach(async function () {
    const assignmentFactory = await ethers.getContractFactory(contractPath);
    assignmentContract = await assignmentFactory.deploy();
    await assignmentContract.waitForDeployment();
    [owner, addr1, addr2, addr3, addr4, addr5, addr6, addr7, addr8, addr9, addr10, addr11] = await ethers.getSigners();
  });

  describe("2.1 Set string", function () {
    it("User can set their message", async function () {
        const text ="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";
        await assignmentContract.connect(addr1).setString(text);
        expect(await assignmentContract.connect(addr1).getString()).to.equal(text);
    });
    it("User can update their message", async function () {
        const text ="Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy";
        await assignmentContract.connect(addr1).setString(text);
        expect(await assignmentContract.connect(addr1).getString()).to.equal(text);
    });
    it("Every user can set their message", async function () {
        const text1 ="Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy";
        const text2 ="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.";
        const text3 ="It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
        const text4 ="The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.";
        const text5 ="There is no minimum donation, any sum is appreciated ";

        await assignmentContract.connect(addr2).setString(text1);
        await assignmentContract.connect(addr3).setString(text2);
        await assignmentContract.connect(addr4).setString(text3);
        await assignmentContract.connect(addr5).setString(text4);
        await assignmentContract.connect(addr6).setString(text5);
        expect(await assignmentContract.connect(addr6).getString()).to.equal(text5);
    });
  });

  describe("2.2 Get String ", function () {
    it("Should return correct string whatever user setted", async function () {
      const text ="There is no minimum donation, any sum is appreciated ";
      await assignmentContract.connect(addr10).setString(text);
      expect(await assignmentContract.connect(addr10).getString()).to.equal(text);
    });

    it("Should return empty string if user didn't set string and try to get string", async function () {
      expect(await assignmentContract.connect(addr11).getString()).to.equal('');
    });
  });
  
  describe("2.3 Check Set String Event", function () {
    it("Should emit an event on set string", async function () {
        const text ="Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
        await expect(assignmentContract.connect(addr1).setString(text)).to.emit(assignmentContract, "SETSTRING")
        .withArgs(addr1.address, text);
    });
  });
});
