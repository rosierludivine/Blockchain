//recupérer le contract a partir de l'artefact 
const Tickets = artifacts.require('Tickets');
//Importation de assert a fin de regarder si les conditions sont juste
const assert = require('assert');

//Debut des test qui vont etre sur Ticket 
contract('Tickets', (accounts) => {
//Création d'une constante acheteur 
  const shopper = accounts[1];
  //constante pour savoir l'id du ticket que l'acheteur a choisi 
  const TICKET_ID = 0;

  // 1er test qui permet de verifier si l'acheteur aura le droit d'acheter 
  it('should allower a user to buy a ticket', async () => {
    //deploiment du contrat Tickets 
    const instance = await Tickets.deployed();
    //récuperation de id du tickets ainsi que sa valeur initial 
    const originalTicket = await instance.tickets(
      TICKET_ID
    );
    // Simulation de lachat du ticket 
    await instance.buyTicket(TICKET_ID, {
        //indication de l'adresse de l'acheteur 
      from: shopper,
      //valeur du transfere 
      value: originalTicket.price,
    });

    // mise à jour du nouveau status du ticket 
    const updatedTicket = await instance.tickets(TICKET_ID);

    //verification que se soit bien l'acheteur qui a eu le ticket
    assert.equal(
      updatedTicket.owner,
      shopper,
      "l'acheteur devrait maintenant posséder ce billet"
    );
  });
});