import '../App.css';
import React, { useState, useEffect } from "react";
import Web3 from 'web3'//changed from web3-eth to web3
import { Biconomy } from "@biconomy/mexa";
declare let window: any

const { config } = require("../config");


let web3;
let biconomy;
let contract;

export type ExternalProvider = {
  isMetaMask?: boolean;
  isStatus?: boolean;
  host?: string;
  path?: string;
  sendAsync?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
  send?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
  request?: (request: { method: string, params?: Array<any> }) => Promise<any>
}


const KraterAdmin = () => {

    const [smartWallets, setSmartWallets] = useState<string>();
    const [farmSmartWalletToPay, setFarmSmartWalletToPay] = useState<string>();
    const [tokenToPay, setTokenToPay] = useState<string>();
    const [amountsToPay, setAmountsToPay] = useState<string>();
  
    const [agent, setAgentForNewFarm] = useState<string>();
    const [nameForNewFarm, setNameForNewFarm] = useState<string>();

    const [noOfMinerWalletsToCreate, setNoOfMinerWalletsToCreate] = useState<string>();
    const [miningUsers, setMiningUsers] = useState<string[]>([]); //can make this an array so we can add multiple miner smart wallets at once but will need to change html below for that, may leave this part to Dima
  
    const [owner, setOwner] = useState();
  
    const [tokenContractForTreasury, setTokenContractForTreasury] = useState<string>();
    const [amountForTreasury, setAmountForTreasury] = useState<string>();
    const [farmToPayTreasury, setFarmToPayTreasury] = useState<string>();
  
    useEffect(() => {

      if(typeof window.ethereum !== 'undefined') {

        biconomy = new Biconomy(window.ethereum as ExternalProvider, { 
      
          apiKey: "aMKpd4RBy.71bf1b8a-6a49-4595-a472-162dc7b5cd18", 
          strictMode: false, 
          debug: true, 
          contractAddresses: ["0x4ccda21d9da962e05cfb246adac7c79c6b5823de"]
        
        });
        
        setOwner(window.ethereum.selectedAddress);
    
        web3 = new Web3(biconomy.provider);
        
        contract = new web3.eth.Contract(
          
          config.contract.abi, 
          config.contract.address
          
        );

        initializeBiconomy();
        
      } else {

        alert('No web3 installed');

      }
  
  
    }, []);

    async function initializeBiconomy() {
  
      await biconomy.init();
      console.log("biconomy Ready");
  
    }
  
  
    if (

      typeof web3 !== 'undefined'

    ) {

      window.ethereum.on('accountsChanged', (accounts) => {
  
        setOwner(accounts); 
    
      });

    }

    async function getAccounts() {

      window.ethereum.request({ method: 'eth_requestAccounts'}).then(accounts => {

        setOwner(accounts);
         
      })

    }
  
    async function createTreasury(e) {
  
      console.log(web3.providor);
  
      e.preventDefault();
  
      await contract.methods.createTreasury(
  
      ).send({
  
        from: window.ethereum.selectedAddress,
        signatureType: "EIP712_SIGN"
  
      }).once("receipt", (receipt) => {
  
        console.log(receipt.transactionHash);
  
      })
  
    }
   
    async function sendFarmPayment(e) {
  
      e.preventDefault();
  
      await contract.methods.payFarmFromMiningUsers(
        
        smartWallets, 
        farmSmartWalletToPay, 
        tokenToPay, 
        amountsToPay
        
      ).send({
        
        from: window.ethereum.selectedAddress,
        signatureType: "EIP712_SIGN"
  
      }).once("receipt", (receipt) => {
  
        console.log(receipt.transactionHash);
  
      })
  
    }
  
    //this function works if I submit it without changing accounts in Metamask, but If I change accounts before calling it, it gives me an error "e.toLowerCase is not a function"
    async function handleSubmit4CreateFarmSmartWallet(e) {
  
      e.preventDefault();
  
      await contract.methods.createFarmSmartWallet(
        
        agent,
        nameForNewFarm
        
      ).send({
        
        from: window.ethereum.selectedAddress,
        signatureType: "EIP712_SIGN"
      
      }).once("receipt", (receipt) => {

        console.log(receipt.transactionHash);
  
      })
  
        
    }

    const renderMinerAddressInputFields = (_noOfMinerWalletsToCreate) => {

      var elementsArray = [];

      for(var i = 0; i < _noOfMinerWalletsToCreate; i++) {

        elementsArray.push(

          <section>

            <label htmlFor="miningUser">Mining User Address: </label>
            <input type="string" id="miningUser" onChange={e => setMiningUsers([...miningUsers, e.target.value])} />

          </section>

        )

      }
      
      return elementsArray;

    } 
  
    async function handleSubmit4WhitelistingMinier(e) {
  
      e.preventDefault();
  
      await contract.methods.createMinerSmartWallets(
        
        miningUsers
        
      ).send({
  
        from: window.ethereum.selectedAddress,
        signatureType: "EIP712_SIGN"
        
      }).once("receipt", (receipt) => {
  
        console.log(receipt.transactionHash);
  
      })
  
    }
  
    async function takeTreasuryFee(e) {
  
      e.preventDefault();
  
      await contract.methods.takeTreasuryFee(
  
        tokenContractForTreasury,
        farmToPayTreasury,
        amountForTreasury
  
      ).send({
  
        from: window.ethereum.selectedAddress,
        signatureType: "EIP712_SIGN"
  
      }).once("receipt", (receipt) => {
  
        console.log(receipt.transactionHash);
  
      })
  
  
    }
    

    return(

        <div>

          <button id='connectButton' onClick={e => getAccounts()} >Connect Wallet</button>

          <p>Account: {owner}</p>
          
          <section>
            
            <h2>Krater Admin Panel</h2>
            
            <h5>Create Farm SmartWallet</h5>
            <form onSubmit={e => {handleSubmit4CreateFarmSmartWallet(e)}}>

              <label htmlFor="agentForOnboardingFarm">Farm Agent: </label>
              <input type="text" id="agentForOnboardingFarm" onChange={e => setAgentForNewFarm(e.target.value)} /> 
              
              <br />

              <label htmlFor="nameOfFarm">Farm Name: </label>
              <input type="text" id="nameOfFarm" onChange={e => setNameForNewFarm(e.target.value)} />

              <br />

              <input type="submit" value="Submit Creation Of New Farm"/>

            </form>

            <h5>Create Miner SmartWallets</h5>
            <form onSubmit={e => {handleSubmit4WhitelistingMinier(e)}}>

              <label htmlFor="NoOfMinerWalletsToCreate">Number Of Smart Wallets To Create: </label>
              <input type="text" id="NoOfMinerWalletsToCreate" onChange={e => setNoOfMinerWalletsToCreate(e.target.value)} />

              <br />  

              {renderMinerAddressInputFields(noOfMinerWalletsToCreate)}

              <input type="submit" value="Submit User Address" />

            </form>

            <h5>Create Treasury Contract</h5>
            <form onSubmit={e => createTreasury(e)}>

              <input type="submit" value="Create Treasury" />

            </form>

            <h5>Pay Farm For Electricity From Mining Users</h5>
            <form onSubmit={e => sendFarmPayment(e)}>

              {/* Some of the below inputs correspond to array inputs in the smart contract, so we may need to enter them like this [input] */}

              <label htmlFor="SWFarmPayment">Mining User SmartWallets: </label>
              <input id="SWFarmPayment" type="text" onChange={e => setSmartWallets(e.target.value)} /><br />

              <label htmlFor="Farm4FarmPayment">Receiving Farm: </label> 
              <input id="Farm4FarmPayment" type="text" onChange={e => setFarmSmartWalletToPay(e.target.value)} /><br />
              
              <label htmlFor="Token4FarmPayment">Token Contract: </label>
              <input id="Token4FarmPayment" type="text" onChange={e => setTokenToPay(e.target.value)} /><br />
              
              <label htmlFor="Amounts4FarmPayment">Token Amounts: </label>
              <input id="Amounts4FarmPayment" type="number" onChange={e => setAmountsToPay(e.target.value)} /><br />
              
              <input type="submit" value="Pay Farm" />

            </form>

            <h5> Take Treasury Fee From Farm</h5>
            <form onSubmit={e => takeTreasuryFee(e)}>
              
              <label htmlFor="tokenContractForTreasury">ERC20 Token: </label>
              <input id="tokenContractForTreasury" type="text" onChange={e => setTokenContractForTreasury(e.target.value)} /><br />

              <label htmlFor="amountForTreasury" >Fee Amount: </label>
              <input id="amountForTreasury" type="number" onChange={e => setAmountForTreasury(e.target.value)} /> <br />

              <label htmlFor="farmToPayTreasury">Paying Farm</label>
              <input id="farmToPayTreasury" type="text" onChange={e => setFarmToPayTreasury(e.target.value)} /> <br />

            </form>
            
          </section>

          <section>
            
            <h3>Miner Panel</h3>
          
          </section>
          
          <section>
            
            <h3>Farm Panel</h3>
          
          </section>

        </div>


    );

}

export default KraterAdmin;