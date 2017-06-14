pragma solidity ^0.4.2;

library Flight {
	struct Data {
		mapping(uint => Flight) flights;
        mapping(uint => History) history;
		mapping(uint => bool) exists;
	}

	struct Flight {
		uint flightNo;
		uint tailNo;
        string origin;
        string destination;
        string takeOffTime;
        string landingTime;
	}

    struct History {
		bytes32[] transactions;
	}

	function initialize (Data storage self, uint flightNo, uint tailNo, 
                        string origin, string destination, 
                        string takeOffTime, string landingTime) {
		if (!self.exists[flightNo]) {
            self.exists[flightNo] = true;
            self.flights[flightNo] = Flight({
                flightNo: flightNo,
                tailNo: tailNo,
                origin: origin,
                destination: destination,
                takeOffTime: takeOffTime,
                landingTime: landingTime,
            });
		}
	}
}