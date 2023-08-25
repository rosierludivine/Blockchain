import React, { useState, useEffect } from 'react';
import MarriageContract from '../../contracts/Marriage.json'; // Importez le Contrat 
import Web3 from 'web3';

function Intro() {
  //Etat des objet et du contrat 
  const [web3, setWeb3] = useState(null);//Web3js outil pour interagir avec le contrat 
  const [contract, setContract] = useState(null);//Etat du contrat 
  const [married1, setMarried1] = useState('');//adresse du premier marier 
  const [married2, setMarried2] = useState('');//adresse du deuxieme marier 

  //Suivre si l'etat de Web3js a bien etait bien initialiser 
  const [initialized, setInitialized] = useState(false); 

  // initialisation de Web3js
  const initializeWeb3 = async () => {
    if (!initialized && window.ethereum) { // Vérifiez si l'initialisation n'a pas déjà été effectuée
      await window.ethereum.enable();
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = MarriageContract.networks[networkId];
      const contractInstance = new web3Instance.eth.Contract(
        MarriageContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(contractInstance);
      setInitialized(true); // Marquez l'initialisation comme terminée
    } else {
      console.log('Please install MetaMask or use a Web3-enabled browser');
    }
  };

  useEffect(() => {
    initializeWeb3(); // Garantir l'initialisation de Web3 
  }, []); 
  //Creation d'un marriage 
  const weddingCreate = async () => {
    if (contract) {
      try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.weddingCreate(married1, married2).send({ from: accounts[0] });
        console.log(result); // Gérer le résultat selon les besoins

      } catch (error) {
        console.error(error);
      }
    }
  };
  // Création d'une fonction séparation 
  const separate = async () => {
    if (contract) {
      try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.separate().send({ from: accounts[0] });
        console.log(result); //Gérer le résultat selon les besoins

      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1 name="title">Wedding or Divorce</h1>
      <hr />
      <br />
      Entrez la première adresse
      {/* input comportent la premiere adresse de la premiere personne  */}
      <input
        name="married1"
        placeholder="entrer votre premiere adresse"
        onChange={(e) => setMarried1(e.target.value)}
      ></input>
      <br />
      Entrez la deuxieme adresse
      {/* input comportant l'adresse de la deuxieme personne  */}
      <input
        name="married2"
        placeholder="entrer votre premiere adresse"
        onChange={(e) => setMarried2(e.target.value)}
      ></input>
      <button onClick={weddingCreate}> Create a Wedding </button>
      <button onClick={separate}> Grant a divorce</button>
    </div>
  );
}

export default Intro;