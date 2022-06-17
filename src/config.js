let config = {};
config.contract = {
	address: /*"0xf36Eb7f366C3e5d98f80f3C1441D25e0880fC1ad"<-matic main net deployment 
	 * "0xC35484215BbFBAFcbdC6a31D32897E54ae06159f",//<-rinkeby deployment 
	 * "0x48bb543B351662C96868b05e0f1beCc05a24A26b" kovan deployment*/
		0x32A8B8b2e8e3A293343D28E7724876C707c65eF3,//kovan deployment for Chirag
	abi: [
		{
			"inputs": [],
			"name": "createPersonalMiningSmartWallet",
			"outputs": [
				{
					"internalType": "address",
					"name": "smartWallet",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "location",
					"type": "string"
				},
				{
					"internalType": "uint8",
					"name": "electricityPrice",
					"type": "uint8"
				}
			],
			"name": "onboardAsFarm",
			"outputs": [
				{
					"internalType": "address",
					"name": "newFarmContract",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "yourSmartWallet",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "tokenContract",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "farm",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "sendFarmPayment",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_forwarder",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "farmAgent",
					"type": "address"
				}
			],
			"name": "whiteListHostingProvidor",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "user",
					"type": "address"
				}
			],
			"name": "whiteListMiningUser",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "forwarder",
					"type": "address"
				}
			],
			"name": "isTrustedForwarder",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "viewAllFarms",
			"outputs": [
				{
					"internalType": "address[]",
					"name": "farmsAtKrater",
					"type": "address[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "viewAllSmartWallets",
			"outputs": [
				{
					"internalType": "address[]",
					"name": "smartWallets",
					"type": "address[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]
    /*
    [
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "newQuote",
                    "type": "string"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                }
            ],
            "name": "setQuoteMeta",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getQuote",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "currentQuote",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "currentOwner",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "nonces",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "quote",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]*/
}


module.exports = { config }
