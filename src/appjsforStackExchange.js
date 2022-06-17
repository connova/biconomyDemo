import React, { useState, useEffect } from "react";
import './App.css';
import Web3 from 'web3-eth'
import Biconomy from "@biconomy/mexa";

import 'react-notifications/lib/notifications.css';
const { config } = require("./config");

let web3;
let biconomy;
let contract;


function App() {

    //My state variables added here below
    const [farmAgent, setAgentForWhitelistingFarm] = useState();

    //My state variables above


    const [owner, setOwner] = useState();

    useEffect(() => {

        biconomy = new Biconomy(window.ethereum, { apiKey: "EEx4HcTA2.1edb119a-55c0-45e7-9e75-e1bb4204ffb3", strictMode: false, debug: true });

        web3 = new Web3(biconomy);

        biconomy.onEvent(biconomy.READY, async () => {
            // Initialize your dapp here like getting user accounts etc
            console.log("biconomy Ready");

            await window.ethereum.enable();
            contract = new web3.Contract(config.contract.abi, config.contract.address);
        }).onEvent(biconomy.ERROR, (error, message) => {
            // Handle error while initializing mexa
            console.log(error)
        });
    }
        , []);

    window.ethereum.on('accountsChanged', (accounts) => {
        setOwner(accounts);
    });


    async function handleSubmit4WhitelistingFarmAgent(e) {

        e.preventDefault();

        console.log(contract);
        console.log(contract.methods);
        console.log(web3.currentProvider);

        await contract.methods.whiteListHostingProvidor(farmAgent).send({ from: owner[0] });

    }


    return (
        <div className="App">

            <div>

                <p>Account: {owner}</p>


                <section>

                    <h2>krtr Admin</h2>

                    <h5>Whitelist Farm Agent</h5>
                    <form onSubmit={e => { handleSubmit4WhitelistingFarmAgent(e) }}>

                        <input type="text" name="agentForOnboardingFarm" onChange={e => setAgentForWhitelistingFarm(e.target.value)} />
                        <input type="submit" value="Submit Agent Address" />

                    </form>

                </section>

            </div>
        </div >
    );
}

export default App;
