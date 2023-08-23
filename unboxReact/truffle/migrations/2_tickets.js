//Appel du contract Ticket a partir de l'artefact 
const Tickets = artifacts.require("Tickets");


module.exports = function (deployer) {
  //deployer le contract Tickets 
  deployer.deploy(Tickets);
};