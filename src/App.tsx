import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js"
import Web3 from 'web3'//changed from web3-eth to web3
import { Biconomy } from "@biconomy/mexa";
declare let window: any

const { config } = require("./config");


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


function App() {

  //My state variables added here below

  const [smartWallets, setSmartWallets] = useState<string>();
  const [farmSmartWalletToPay, setFarmSmartWalletToPay] = useState<string>();
  const [tokenToPay, setTokenToPay] = useState<string>();
  const [amountsToPay, setAmountsToPay] = useState<string>();

  const [agent, setAgentForNewFarm] = useState<string>();
  const [nameForNewFarm, setNameForNewFarm] = useState<string>();

  const [miningUsers, setMiningUsers] = useState<string>(); //can make this an array so we can add multiple miner smart wallets at once but will need to change html below for that, may leave this part to Dima

  const [owner, setOwner] = useState();

  const [tokenContractForTreasury, setTokenContractForTreasury] = useState<string>();
  const [amountForTreasury, setAmountForTreasury] = useState<string>();
  const [farmToPayTreasury, setFarmToPayTreasury] = useState<string>();

  useEffect(() => {

    biconomy = new Biconomy(window.ethereum as ExternalProvider, { 
      
        apiKey: "wNVpQx3oM.b2288b97-79f6-4964-a619-c905eaf05761", 
        strictMode: false, 
        debug: true, 
        contractAddresses: ["0x6c984751588d584bead41cb7ff77d28dbe8a0b6f"]
      }

    );
    
      setOwner(window.ethereum.selectedAddress);
 
      web3 = new Web3(biconomy.provider);
      contract = new web3.eth.Contract(
        
        config.contract.abi, 
        config.contract.address
        
      );

      initializeBiconomy();


      

  }
    , []);

  async function initializeBiconomy() {

    await biconomy.init();
    console.log("biconomy Ready");

  }



  window.ethereum.on('accountsChanged', (accounts) => {

    setOwner(accounts);

  });


  async function createTreasury(e) {

    console.log(web3.providor);

    e.preventDefault();

    await contract.methods.createTreasury(

    ).send({

      from: owner,
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
      
      from: owner,
      signatureType: "EIP712_SIGN"

    });

  }


  async function handleSubmit4CreateFarmSmartWallet(e) {

    e.preventDefault();

      await contract.methods.createFarmSmartWallet(
        
        agent,
        nameForNewFarm
        
      ).send({
        
        from: owner,
        signatureType: "EIP712_SIGN"
      
      });

      
  }

  async function handleSubmit4WhitelistingMinier(e) {

    e.preventDefault();

    await contract.methods.createMinerSmartWallets(
      
      miningUsers
      
    ).send({

      from: owner,
      signatureType: "EIP712_SIGN"
      
    });

  }

  async function takeTreasuryFee(e) {

    e.preventDefault();

    await contract.methods.takeTreasuryFee(

      tokenContractForTreasury,
      farmToPayTreasury,
      amountForTreasury

    ).send({

      from: owner,
      signatureType: "EIP712_SIGN"

    })


  }

  return (
    <div className="App">
      Matic Mumbai

        <Router>

          <Navbar />

          <Routes>

            <Route path="/">Krater Panel</Route>
            <Route path="/">Alchemy</Route>

          </Routes>

        </Router>

        <div>

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

            <h5>Create Miner SmartWallet</h5>
            <form onSubmit={e => {handleSubmit4WhitelistingMinier(e)}}>

              <label htmlFor="miningUser">Mining User Address: </label>
              <input type="text" id="miningUser" onChange={e => setMiningUsers(e.target.value)} />

              <br />

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

    </div >
  );
}

export default App;
