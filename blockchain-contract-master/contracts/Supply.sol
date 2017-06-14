pragma solidity ^0.4.2;

import './PartPool.sol';
import './Flight.sol';

contract Supply {
	PartPool.Data pool;
    Flight.Data flights;

	function Supply() {
	}

	function addPartHistory(uint serialNo, bytes32 transaction) {
		pool.history[serialNo].transactions.push(transaction);
	}

    function addFlightHistory(uint tailNo, bytes32 transaction) {
		flights.history[tailNo].transactions.push(transaction);
	}

	function searchPartHistory(uint serialNo) constant returns (bytes32[]){
		return pool.history[serialNo].transactions;
	}

    function searchFlightHistory(uint tailNo) constant returns (bytes32[]){
		return flights.history[tailNo].transactions;
	}

	function manufacture(uint partNo, uint serialNo, string description, string owner, string time) 
	{
        PartPool.manufacture(pool, partNo, serialNo, description, owner);
	}	

    function install(uint serialNo, uint tailNo, string installer, string time){
        PartPool.installation(pool, serialNo, tailNo, installer);
    }

    function loan(uint serialNo, string owner, string borrower, string timeToReturn, string time) {
        PartPool.loan(pool, serialNo, owner, borrower, timeToReturn);
    }

	/// Make 2 call to transfer to get both hash
	/// If call only 1 function will only give 1 transaction hard to track for the exchanged item

    // function exchange(uint serialNo1, uint serialNo2, string time) returns (bytes32, bytes32){
    //     return PartPool.exchange(pool, serialNo1, serialNo2);
    // }

    function sell(uint serialNo, string _from, string _to, string time) {
        PartPool.sell(pool, serialNo, _from, _to);
    }

	function transfer(uint serialNo, string _from, string _to, string time) {
        PartPool.transfer(pool, serialNo, _from, _to);
    }

	function makeFlight(uint flightNo, uint tailNo, string origin, string destination,
                            string takeOffTime, string landingTime) {
        Flight.initialize(flights, flightNo, tailNo, origin, destination, takeOffTime, landingTime);
	}

    function overhaul (uint serialNo, string mro, string time) {
        PartPool.overhaul(pool, serialNo, mro);
    }

    function repair (uint serialNo, string mro, string time) {
        PartPool.repair(pool, serialNo, mro);
    }

    function inspect (uint serialNo, string mro, string time) {
        PartPool.inspect(pool, serialNo, mro);
    }

    function remove (uint serialNo, string mro, string time) {
        PartPool.remove(pool, serialNo, mro);
    }
}