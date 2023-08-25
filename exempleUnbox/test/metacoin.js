const MetaCoin = artifacts.require("MetaCoin");


// permet de faire des tests pour savoir si tout ce passe dans les regles 
//Si le recevoir a bien envoyer la bonne sommes et que le receveur et bien recu la bonne sommes 

contract('MetaCoin', (accounts) => {
  //savoir si il y a le bon montant qui va aller sur le premier compte
  it('should put 10000 MetaCoin in the first account', async () => {

    //deployer le metacoin 
    const metaCoinInstance = await MetaCoin.deployed();
    //test si la balance est bonne 
    const balance = await metaCoinInstance.getBalance.call(accounts[0]);
    //si le test est faux afficher la phrase  
    //valueOf permet de mettre un entier dans la balance
    //car la balance est fixer a 10 dans le constructeur 
    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });

  // savoir si la librairie renvoie bien les bonnes informations 
  it('should call a function that depends on a linked library', async () => {
    const metaCoinInstance = await MetaCoin.deployed();
    const metaCoinBalance = (await metaCoinInstance.getBalance.call(accounts[0])).toNumber();
    const metaCoinEthBalance = (await metaCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();

    assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, 'Library function returned unexpected function, linkage may be broken');
  });
  it('should send coin correctly', async () => {
    const metaCoinInstance = await MetaCoin.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await metaCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();


    // le montant a pas était mal prelever par l'envoyeur 
    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
   // le montant a mal était envoyer 
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
