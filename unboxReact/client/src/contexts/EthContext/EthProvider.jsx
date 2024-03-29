import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  //hook useReducer 
  //useReducer a state comme le statue maintenant, dispatch pour la nouvelle valeur 
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    //Js attend un 
    //artefact
    async artifact => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        //recuperation de l'address 
        const { abi } = artifact;
        let address, contract;
        try {
          address = artifact.networks[networkID].address;
          //reprise des abi et adress 
          contract = new web3.eth.Contract(abi, address);
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          //initialiser les données et passe le contrat repris au dessus
          data: { artifact, web3, accounts, networkID, contract }
        });
      }
    }, []);

    //utilisation du hook useEffect pour passer du contenue 
  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/SimpleStorage.json");
        //passer la fonction init a partir de l'artifact 
        // la fonction init permet de reccuperer les infos par l'artifact 
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
