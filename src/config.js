let config = {};
config.contract = {
	address: "0x4ccda21d9da962e05cfb246adac7c79c6b5823de",
	abi: [
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_trustedForwarder",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "approved",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "operator",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "bool",
					"name": "approved",
					"type": "bool"
				}
			],
			"name": "ApprovalForAll",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "farmAgent",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "_name",
					"type": "string"
				}
			],
			"name": "createFarmSmartWallet",
			"outputs": [
				{
					"internalType": "address",
					"name": "farmSmarWallet",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "createMarketplace",
			"outputs": [
				{
					"internalType": "address",
					"name": "marketplaceContract",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "marketplaceTreasuryContract",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address[]",
					"name": "miningUsers",
					"type": "address[]"
				}
			],
			"name": "createMinerSmartWallets",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "createTreasury",
			"outputs": [
				{
					"internalType": "address",
					"name": "treasuryContract",
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
					"name": "_serialNumber",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_model",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "_currentOwner",
					"type": "address"
				},
				{
					"internalType": "enum KraterMaster.minerStatus",
					"name": "_status",
					"type": "uint8"
				},
				{
					"internalType": "string",
					"name": "_minerAPI",
					"type": "string"
				}
			],
			"name": "mintMinerNFT",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "mintMinerNFTs",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "operator",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				},
				{
					"internalType": "bytes",
					"name": "data",
					"type": "bytes"
				}
			],
			"name": "onERC721Received",
			"outputs": [
				{
					"internalType": "bytes4",
					"name": "",
					"type": "bytes4"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address[]",
					"name": "miningUserSmartWallets",
					"type": "address[]"
				},
				{
					"internalType": "address",
					"name": "farmSmartWallet",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "paymentTokenContract",
					"type": "address"
				},
				{
					"internalType": "uint256[]",
					"name": "paymentAmounts",
					"type": "uint256[]"
				}
			],
			"name": "payFarmFromMiningUsers",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "safeTransferFrom",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				},
				{
					"internalType": "bytes",
					"name": "data",
					"type": "bytes"
				}
			],
			"name": "safeTransferFrom",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "operator",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "approved",
					"type": "bool"
				}
			],
			"name": "setApprovalForAll",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "erc20Token",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "farm",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "feeAmount",
					"type": "uint256"
				}
			],
			"name": "takeTreasuryFeeFromFarm",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "stableCoinToken",
					"type": "address"
				}
			],
			"name": "takeTreasuryFeeFromMarketplace",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "erc20Token",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "treasury",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "farm",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "TreasuryFeeFromFarm",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "minerId",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_currentOwner",
					"type": "address"
				},
				{
					"internalType": "enum KraterMaster.minerStatus",
					"name": "_status",
					"type": "uint8"
				},
				{
					"internalType": "string",
					"name": "_minerAPI",
					"type": "string"
				}
			],
			"name": "updateMinerNFT",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "erc20Token",
					"type": "address"
				}
			],
			"name": "withdrawERC20",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "withdrawMattic",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "nftId",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "withdrawTo",
					"type": "address"
				}
			],
			"name": "withdrawNFTs",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "getApproved",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "operator",
					"type": "address"
				}
			],
			"name": "isApprovedForAll",
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
			"name": "name",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "ownerOf",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes4",
					"name": "interfaceId",
					"type": "bytes4"
				}
			],
			"name": "supportsInterface",
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
			"name": "symbol",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "tokenURI",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "minerId",
					"type": "uint256"
				}
			],
			"name": "viewMinerData",
			"outputs": [
				{
					"internalType": "string",
					"name": "_serialNumber",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_model",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "_currentOwner",
					"type": "address"
				},
				{
					"internalType": "enum KraterMaster.minerStatus",
					"name": "_status",
					"type": "uint8"
				},
				{
					"internalType": "string",
					"name": "_minerAPI",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]
}

config.marketplace = {
	addressMarketplace: "0xcb8289CbF435B453CF92853b2497784FeDD53194",
	addressMarketplaceTreasury: "0x54C968B5be079CB6ED56BFD95e7c04D4005f499E",
	abiMarketplace: [
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_masterContract",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_trustedForwarder",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "workerNFTId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "seller",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "buyer",
					"type": "address"
				}
			],
			"name": "WorkerPurchased",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "stableCoinToken",
					"type": "address"
				}
			],
			"name": "approveMasterForTreasuryFeeWithdrawal",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_workerNFTId",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "stableCoinToken",
					"type": "address"
				}
			],
			"name": "buyFromSale",
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
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_workerNFTId",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_price",
					"type": "uint256"
				}
			],
			"name": "startSale",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newMaster",
					"type": "address"
				}
			],
			"name": "updateMaster",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "newTreasuryFeePercentage",
					"type": "uint256"
				}
			],
			"name": "updateTreasuryFee",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]
}


module.exports = { config }
