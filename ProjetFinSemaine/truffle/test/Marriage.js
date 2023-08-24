const Wedding = artifacts.reaquire("wedding");

contract("wedding",function (accounts){
    //Creation de la variable instance
    let instance;

    //Pour être sur de faire un nouveau test et pas sur celui d'avant 
    beforeEach(async () => {
        //déployer le contract 
        instance = await Wedding.new(); 
    })


    //test pour savoir si le mariage a bien était créer 
    it("create a Wedding", async () => {
        //les mariés 0 et 1 
        const married1 = accounts[0];
        const married2 = accounts[1];    
        //Appel de fonction weddingCreate de mon contrat est garde le resultat dans result 
        const result = await instance.weddingCreate( married1, married2);
        //si le résulatat est juste retourner Felicitation pour votre mariage bonne lune de miel 
        assert.equal(result, "Congratulations on your wedding an honeymoo");
    
      }); 

      //Verification de divorces 
      //test pour savoir si il ont bien divorcer 
      it("grant a divorce", async () => {
        //utilisation de la fonction weddingcreate pour savoir les 2 personne 
        await instance.weddingCreate(accounts[0], accounts[1]);
        // on Fait appel a la fonction séparer et on stock le resultat 
        const result = await instance.separate();
     //si le résulatat est juste retourne Vous êtes maintenant divorcé, vous êtes libre 
        assert.equal(result, "You are now divorced, you are free ");
    
      });
    
    });