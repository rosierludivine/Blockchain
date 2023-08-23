// SPDX-License-Identifier: MIT 
//Licences 
pragma solidity >=0.4.22 <0.9.0;

//Nombre de ticket mis en vente 
uint256 constant total = 2; 

contract Tickets {
  // stockage de ladresse du propriétaire 
  address public propietaire = msg.sender;

  struct Ticket {
    //prix du tucket 
    uint256 prix;
    //adress du propriétaire 
    address propietaire;
  }

//Création d'un tableau de taille total afin de stocker les donner de chaque ticket
  Ticket[total] public tickets;

  //Création du constructeur 
  constructor() {
    //parcourrir le tableau pour que chaque ticket soit initialisé
    for (uint256 i = 0; i < total; i++) {
      tickets[i].prix = 50e15; // ajout du prix
      tickets[i].propietaire = address(0x0);//pas de propriétaire 
    }
  }

  //Fonction pour acheter un ticket
  function achatTicket(uint256 _index) external payable {
    //Condition 1 l'index du ticket dois exister dans les index possible 
    require(_index < total && _index >= 0);
    //le ticket ne doit pas avoir de propriétaire 
    require(tickets[_index].propietaire == address(0x0));
    //le tickets doit être payer le prix afficher 
    require(msg.value >= tickets[_index].prix);
    //si toute les conditions sonnt remplis alors le tickets a un propriétaires 
    tickets[_index].propietaire = msg.sender;
  }
}