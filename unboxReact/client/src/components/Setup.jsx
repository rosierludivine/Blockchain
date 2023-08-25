  import React, { useState, useEffect } from 'react';
  import Web3 from 'web3'; // Importez Web3.js ou une autre bibliothèque similaire
  
  const Setup = () => {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
  
    useEffect(() => {
      // Initialisez Web3 et récupérez les comptes
      async function initWeb3() {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          try {
            await window.ethereum.enable();
            const accs = await web3Instance.eth.getAccounts();
            setWeb3(web3Instance);
            setAccounts(accs);
          } catch (error) {
            console.error('Permission to access accounts denied');
          }
        } else {
          console.error('No Ethereum wallet detected');
        }
      }
  
      initWeb3();
    }, []);
  
    // Chargez les événements depuis votre contrat intelligent ici
    const events = [
      { id: 1, name: 'Concert', price: '0.1' },
      { id: 2, name: 'Théâtre', price: '0.05' },
      // ... autres événements
    ];
  
    const handleEventSelection = (event) => {
      setSelectedEvent(event);
    };
  
    const handlePurchase = async () => {
      if (!web3) return;
  
      try {
        // Effectuez la transaction d'achat ici en utilisant Web3.js
        // Par exemple :
        const contractAddress = '0x...'; // Adresse de votre contrat intelligent
        const contract = new web3.eth.Contract(prix, contractAddress);
  
        await contract.methods.purchaseTicket(selectedEvent.id).send({
          from: accounts[0],
          value: web3.utils.toWei(selectedEvent.price, 'ether'),
        });
  
        // Mise à jour de l'état ou notification de réussite
      } catch (error) {
        console.error('Erreur lors de l\'achat :', error);
      }
    };
  
    return (
      <div>
        <h1>Acheter des tickets</h1>
        <div>
          <h2>Événements disponibles</h2>
          <ul>
            {events.map((event) => (
              <li key={event.id} onClick={() => handleEventSelection(event)}>
                {event.name} - {event.price} ETH
              </li>
            ))}
          </ul>
        </div>
        {selectedEvent && (
          <div>
            <h2>Achat de ticket pour {selectedEvent.name}</h2>
            <button onClick={handlePurchase}>Acheter (Prix : {selectedEvent.price} ETH)</button>
          </div>
        )}
      </div>
    );
  };
  

export default Setup;
