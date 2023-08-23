// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	// une tableau de hash (transforme l'adresse en entier )
	mapping (address => uint) balances;
	// transfère adresse envoyeur ,adresse receveur, ainsi que la valeur 
	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		//tx.origin transaction original 
		balances[tx.origin] = 10000;
	}

	//envoyer la monnaie numerique 
	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {

		//si le le montant est < au montant annoncer = false autrement true 
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	// 
	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	//fonxtion qui retourne l'adresse  dans eth 
	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
