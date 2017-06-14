pragma solidity ^0.4.2;

import "./StringUtils.sol";

library PartPool {
	struct Data {
		mapping(uint => Part) pool;
		mapping(uint => History) history;
		mapping(uint => bool) exists;
	}

	struct History {
		bytes32[] transactions;
	}

	struct Part {
		uint partNo;
		uint serialNo;
		uint tailNo;
		string description;
		string owner;
		string actor;
		// for loaning 
		string borrower;
		string timeToReturn;
		// for MRO doing overhaul, etc.
		string status;
	}

	function manufacture(Data storage self, uint partNo, uint serialNo, string description, string actor) 
	{
		if (self.exists[serialNo]) throw;
		self.exists[serialNo] = true;
		self.pool[serialNo] = Part({partNo: partNo, 
									serialNo: serialNo, 
									tailNo: uint(0x0),
									description: description, 
									owner: actor,
									actor: actor,
									borrower: "",
									timeToReturn: "",
									status: "on shelf"});
	}	

	function installation (Data storage self, uint serialNo, uint tailNo, string actor) 
    {
		if (!self.exists[serialNo] || self.pool[serialNo].tailNo != uint(0x0)) throw;
		self.pool[serialNo].tailNo = tailNo;
		self.pool[serialNo].actor = actor;
	}

	function loan (Data storage self, uint serialNo, string _owner, string _borrower, string _timeToReturn) 
    {
		if (!self.exists[serialNo]) throw;
		if (!StringUtils.equal(self.pool[serialNo].owner, _owner)) throw;
		self.pool[serialNo].actor = _owner;
		self.pool[serialNo].borrower = _borrower;
		self.pool[serialNo].timeToReturn = _timeToReturn;
	}

	function exchange (Data storage self, uint serialNo1, uint serialNo2) 
        returns (bytes32, bytes32)
    {
		string owner1Str = self.pool[serialNo1].owner;
		string owner2Str = self.pool[serialNo1].owner;
		bytes32 owner1;
		bytes32 owner2;
		if (!self.exists[serialNo1] || !self.exists[serialNo2]) throw;
		assembly {
			owner1 := mload(add(owner1Str, 32))
		}
		assembly {
			owner2 := mload(add(owner2Str, 32))
		}
		self.pool[serialNo1].actor = self.pool[serialNo1].owner;
		self.pool[serialNo2].actor = self.pool[serialNo2].owner;
		(self.pool[serialNo1].owner, self.pool[serialNo2].owner) = (self.pool[serialNo2].owner, self.pool[serialNo1].owner);
		return (owner1, owner2);
	}

    // currently sell is just changing ownership
	function sell (Data storage self, uint serialNo, string seller, string buyer) 
    {
        transfer(self, serialNo, seller, buyer);
	}

    // General function
    function transfer (Data storage self, uint serialNo, string currentOwner, string nextOwner) 
    {
		if (!self.exists[serialNo]) throw;
		if (!StringUtils.equal(self.pool[serialNo].owner, currentOwner)) throw;
		self.pool[serialNo].owner = nextOwner;
    }

    // MRO functions
	function overhaul (Data storage self, uint serialNo, string mro) 
    {
		if (!self.exists[serialNo]) throw;
		// change the status 
		self.pool[serialNo].status = "overhauled";
	}

	function repair (Data storage self, uint serialNo, string mro) 
    {
		if (!self.exists[serialNo]) throw;
		self.pool[serialNo].status = "repaired";
	}

	function inspect (Data storage self, uint serialNo, string mro) 
    {
		if (!self.exists[serialNo]) throw;
		self.pool[serialNo].status = "inspected";
	}

	function remove (Data storage self, uint serialNo, string mro) 
    {
		if (!self.exists[serialNo]) throw;
		self.pool[serialNo].status = "removed";
	}
}