import React, { useState, useEffect } from "react";
import './App.css';
import Web3 from 'web3-eth'
import Biconomy from "@biconomy/mexa";
//import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const { config } = require("./config");
/*
const showErrorMessage = message => {
  NotificationManager.error(message, "Error", 5000);
};
const showSuccessMessage = message => {
  NotificationManager.success(message, "Message", 3000);
};

const showInfoMessage = message => {
  NotificationManager.info(message, "Info", 3000);
};
*/

/*
let domainData = {
  name: "Quote",
  version: "1",
  chainId: "42",  // Kovan
  verifyingContract: config.contract.address
};
const domainType = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" }
];

const metaTransactionType = [
  { name: "nonce", type: "uint256" },
  { name: "from", type: "address" }
];
*/
let web3;
let biconomy;
let contract;

let web3NoBiconomy;
let contractNoBiconomy


function App() {

  //My state variables added here below

  const [smartWallet, setSmartWallet] = useState();
  const [farmToPay, setfarmToPay] = useState();
  const [tokenToPay, settokenToPay] = useState();
  const [amountToPay, setamountToPay] = useState();

  const [farmName, setfarmNameToOnboard] = useState();
  const [farmLocation, setfarmLocationToOnboard] = useState();
  const [farmElectricityPrice, setfarmElectricityPriceToOnboard] = useState();

  const [farmAgent, setAgentForWhitelistingFarm] = useState();
  const [miningUser, setMiningUserToWhitelist] = useState(); 

  //My state variables above


  const [owner, setOwner] = useState();
  /*
  const [quote, setQuote] = useState("This is a default quote");
  const [newQuote, setNewQuote] = useState("");
  */
  useEffect(() => {


    /*if (!window.ethereum) {
      showErrorMessage("Metamask is required to use this DApp")
      return;
    }*/

      //for testing purposes
      //web3NoBiconomy = new Web3(window.ethereum);

      //contract = new web3NoBiconomy.Contract(config.contract.abi, config.contract.address);

    // NOTE: dappId is no longer needed in latest version of Biconomy SDK
      biconomy = new Biconomy(window.ethereum, { apiKey: "EEx4HcTA2.1edb119a-55c0-45e7-9e75-e1bb4204ffb3", strictMode: false, debug: true});

      web3 = new Web3(biconomy);

    biconomy.onEvent(biconomy.READY, async () => {
      // Initialize your dapp here like getting user accounts etc
        console.log("biconomy Ready");

      //await window.ethereum.enable();//commented out just now 7:56 pm 15th june 
      contract = new web3.Contract(config.contract.abi, config.contract.address);
    }).onEvent(biconomy.ERROR, (error, message) => {
      // Handle error while initializing mexa
      console.log(error)
    });
  }
    , []);

  /*const onQuoteChange = event => {
    setNewQuote(event.target.value);
  }*/

  window.ethereum.on('accountsChanged', (accounts) => {
    setOwner(accounts);
  });

  /*async function onButtonClickMeta() {
    setNewQuote("");
    console.log(contract)
    let nonce = await contract.methods.nonces(window.ethereum.selectedAddress).call();
    let message = {};
    message.nonce = parseInt(nonce);
    message.from = window.ethereum.selectedAddress;

    const dataToSign = JSON.stringify({
      types: {
        EIP712Domain: domainType,
        MetaTransaction: metaTransactionType
      },
      domain: domainData,
      primaryType: "MetaTransaction",
      message: message
    });

    window.web3.currentProvider.sendAsync(
      {
        jsonrpc: "2.0",
        id: 999999999999,
        method: "eth_signTypedData_v4",
        params: [window.ethereum.selectedAddress, dataToSign]
      },
      async function (err, result) {
        if (err) {
          return console.error(err);
        }
        console.log("Signature result from wallet :");
        console.log(result);
        if(result && result.result) {
          const signature = result.result.substring(2);
          const r = "0x" + signature.substring(0, 64);
          const s = "0x" + signature.substring(64, 128);
          const v = parseInt(signature.substring(128, 130), 16);
          console.log(r, "r")
          console.log(s, "s")
          console.log(v, "v")
          console.log(window.ethereum.address, "userAddress")
  
          const promiEvent = contract.methods
            .setQuoteMeta(window.ethereum.selectedAddress, newQuote, r, s, v)
            .send({
              from: window.ethereum.selectedAddress
            })
          promiEvent.on("transactionHash", (hash) => {
            showInfoMessage("Transaction sent successfully. Check Console for Transaction hash")
            console.log("Transaction Hash is ", hash)
          }).once("confirmation", (confirmationNumber, receipt) => {
            if (receipt.status) {
              showSuccessMessage("Transaction processed successfully")
            } else {
              showErrorMessage("Transaction Failed");
            }
            console.log(receipt)
          })
        } else {
          showErrorMessage("Could not get user signature. Check console logs for error");
        }
      }
    );
  }*/

  async function createWallet(e) {

    e.preventDefault();

    var biconomyCreateWallet = new Biconomy(window.ethereum, { apiKey: "9xN-OwpdY3.dfff0b31-330b-4f1e-8dde-5709d8ac9a66" });

    var web3CreateWallet = new Web3(biconomyCreateWallet);

    var master = new web3CreateWallet.Contract(config.contract.abi, config.contract.address);

    await master.methods.createPersonalMiningSmartWallet().send({
      from: owner[0]
    });


  }
 
  async function sendFarmPayment(e) {

    e.preventDefault();
    
    var biconomySendFarmPayment = new Biconomy(window.ethereum, { apiKey: "9xN-OwpdY3.dfff0b31-330b-4f1e-8dde-5709d8ac9a66" });

    var web3SendFarmPayment = new Web3(biconomySendFarmPayment);

    var master = new web3SendFarmPayment.Contract(config.contract.abi, config.contract.address);

    await master.methods.sendFarmPayment(smartWallet, farmToPay, tokenToPay, amountToPay).send({
      from: owner[0]
    });

  }

  async function createFarmContract(e) {

    e.preventDefault();
    
    var biconomyCreateFarmContract = new Biconomy(window.ethereum, { apiKey: "9xN-OwpdY3.dfff0b31-330b-4f1e-8dde-5709d8ac9a66" });

    var web3CreateFarmContract = new Web3(biconomyCreateFarmContract);

    var master = new web3CreateFarmContract.Contract(config.contract.abi, config.contract.address);

    await master.methods.onboardAsFarm(farmName, farmLocation, farmElectricityPrice).send({
      from: owner[0]
    });

  }

  async function handleSubmit4WhitelistingFarmAgent(e) {

    e.preventDefault();
    
      //var biconomyWhiteListAgent = new Biconomy(window.ethereum, { apiKey: "NmilGq-IE.827b902c-2781-4a31-bd9e-b46ea869dcb1", strictMode: true, debug: true});

      /*biconomyWhiteListAgent.onEvent(biconomyWhiteListAgent.READY, () => {
          console.log("biconomy READY");
          var web3WhiteListAgent = new Web3(biconomyWhiteListAgent);

          var master = new web3WhiteListAgent.Contract(config.contract.abi, config.contract.address);

          master.methods.whiteListHostingProvidor(farmAgent).send({
              from: owner[0],
              signatureType: biconomyWhiteListAgent.EIP712_SIGN,
          });
      }).onEvent(biconomyWhiteListAgent.ERROR, (error, message) => {
          console.log(error);
          console.log(message);
      });*/

      // below await added for testing purposes

      /*await contractNoBiconomy.methods.whiteListHostingProvidor(farmAgent).send({
          from: owner[0]
      })*/

      console.log(contract);
      console.log(contract.methods);
      console.log(web3.currentProvider);

      await contract.methods.whiteListHostingProvidor(farmAgent).send({from: owner[0]});

  }

  async function handleSubmit4WhitelistingMinier(e) {

    e.preventDefault();
    
    var biconomyWhiteListMiner = new Biconomy(window.ethereum, { apiKey: "9xN-OwpdY3.dfff0b31-330b-4f1e-8dde-5709d8ac9a66" });

    var web3WhiteListMiner = new Web3(biconomyWhiteListMiner);

    var master = new web3WhiteListMiner.Contract(config.contract.abi, config.contract.address);

      await master.methods.whiteListMiningUser(miningUser).send(
          {
            from: owner[0]
          },
          {
              signatureType: biconomy.EIP712_SIGN
          }
      );

  }

  return (
    <div className="App">
      Kovan Network
      {/*<header className="App-header">
        <h1>krater</h1>
        <section className="main">
          <div className="mb-attribution">
            <h2>{newQuote}</h2>
            <p className="mb-author">- {owner}</p>
          </div>
        </section>
        <section>
          <div className="submit-container">
            <div className="submit-row">
              <input size="100"
                border-radius="15"
                type="text"
                placeholder="Enter your quote"
                onChange={onQuoteChange}
                value={newQuote}
              />
              <button type="button" className="button" onClick={onButtonClickMeta}>Submit</button>
            </div>
          </div>
        </section>
  </header>*/}

        <div>

          <p>Account: {owner}</p>
          <section>
            
            <h3>Miner Panel</h3>

            <input type="submit" value="Create Your Miner Smart Wallet" onClick={createWallet} /><br /><br />
            
            <h5>Pay Farm For Electricity</h5>
            <form onSubmit={e => sendFarmPayment(e)}>

              <label htmlFor="SWFarmPayment">Your Smart Wallet Address</label><br />
              <input id="SWFarmPayment" type="text" name="minerSmartWallet" onChange={e => setSmartWallet(e.target.value)} /><br />

              <label htmlFor="Farm4FarmPayment">Receiving Farm</label><br />  
              <input id="Farm4FarmPayment" type="text" name="farmToPay" onChange={e => setfarmToPay(e.target.value)} /><br />
              
              <label htmlFor="Token4FarmPayment">Token Contract</label><br />
              <input id="Token4FarmPayment" type="text" name="tokenToPay" onChange={e => settokenToPay(e.target.value)} /><br />
              
              <label htmlFor="Amount4FarmPayment">Token Amount</label><br />
              <input id="Amount4FarmPayment" type="number" name="amountToPay" onChange={e => setamountToPay(e.target.value)} /><br />
              
              <input type="submit" value="Pay Farm" />

            </form>
          
          </section>
          
          <section>
            
            <h3>Farm Panel</h3>

            <h5>Onboard Farm</h5>
            <form onSubmit={e => {createFarmContract(e)}}>

              <label htmlFor="farmName4Onboarding">Name Of Your Farm</label><br />
              <input id="farmName4Onboarding" type="text" name="farmNameToOnboard" onChange={e => setfarmNameToOnboard(e.target.value)}/><br />
              
              <label htmlFor="farmLocation4Onboarding">Location Of Your Farm</label><br />
              <input id="farmLocation4Onboarding" type="text" name="farmLocationToOnboard" onChange={e => setfarmLocationToOnboard(e.target.value)} /><br />
              
              <label htmlFor="electricityPrice4Onboarding">Electricity Price At Your Farm</label><br />
              <input id="electricityPrice4Onboarding" type="text" name="farmElectricityPriceToOnboard" onChange={e => setfarmElectricityPriceToOnboard(e.target.value)} /><br />
              
              <input type="submit" value="Onboard Farm"/>
            </form>
          
          </section>
          
          <section>
            
            <h2>krtr Admin</h2>
            
            <h5>Whitelist Farm Agent</h5>
            <form onSubmit={e => {handleSubmit4WhitelistingFarmAgent(e)}}>

              <input type="text" name="agentForOnboardingFarm" onChange={e => setAgentForWhitelistingFarm(e.target.value)} /> 
              <input type="submit" value="Submit Agent Address"/>

            </form>

            <h5>Whitelist Mining User</h5>
            <form onSubmit={e => {handleSubmit4WhitelistingMinier(e)}}>

              <input type="text" name="miningUserToWhitelist" onChange={e => setMiningUserToWhitelist(e.target.value)} />
              <input type="submit" value="Submit User Address" />

            </form>
            
          </section>

        </div>

      {/*<NotificationContainer />*/}
    </div >
  );
}

export default App;
