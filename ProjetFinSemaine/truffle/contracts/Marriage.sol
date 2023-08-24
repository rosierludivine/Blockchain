// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Marriage {
    function weddingCreate ( address married1 ,address married2) public pure returns (string memory){
       //condition que les deux personnes ne doivent pas être identique 
       //si celle ci est pas valide on sort de la boucle
       // et on affiche vous ne devais pas entré deux fois la même personne 
        require (married1 != married2, "Congratulations on your wedding an honeymoo");
        //autrement on retourne Felicitation pour votre mariage bonne lune de miel 
        return "Congratulations on your wedding an honeymoo";
    }

    //Création de la function séparer 
    function separate()public pure returns (string memory) {
        //qui retourne ous êtes maintenant divorcé, vous êtes libre 
        return "You are now divorced, you are free ";
    }
}