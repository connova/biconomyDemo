import React, { useState, useEffect } from "react";

import Web3 from 'web3'//changed from web3-eth to web3
import { Biconomy } from "@biconomy/mexa";
declare let window: any

import { config } from "../config";

let biconomy;
let web3;
let marketplace;

export type ExternalProvider = {
    isMetaMask?: boolean;
    isStatus?: boolean;
    host?: string;
    path?: string;
    sendAsync?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
    send?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
    request?: (request: { method: string, params?: Array<any> }) => Promise<any>
  }
  

const Marketplace = () => {

    const [owner, setOwner] = useState<string>();
    const [minerToBuy, setMinerToBuy] = useState<string>();
    const [minerToSell, setMinerToSell] = useState<string>();
    const [price, setPrice] = useState<string>();

    useEffect(() => {

        if(typeof window.ethereum !== 'undefined') {

            biconomy = new Biconomy(window.ethereum as ExternalProvider, {

                apiKey: "wNVpQx3oM.b2288b97-79f6-4964-a619-c905eaf05761",
                strictMode: false,
                debug: true,
                contractAddresses: ["0xcb8289cbf435b453cf92853b2497784fedd53194"]

            });

            setOwner(window.ethereum.selectedAddress);

            web3 = new Web3(biconomy.provider);

            marketplace = new web3.eth.Contract(

                config.marketplace.abiMarketplace,
                config.marketplace.addressMarketplace
      
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


    async function getAccounts() {

        window.ethereum.request({ method: 'eth_requestAccounts'}).then(accounts => {
  
          setOwner(accounts);
           
        })
  
      }
    

    async function sellWorker(e) {

        e.preventDefault();

        await marketplace.methods.startSale(

            minerToSell,
            price

        ).send({

            from: window.ethereum.selectedAddress,
            signatureType: "EIP712_SIGN"

        }).once("receipt", (receipt) => {

            console.log(receipt.transactionHash);

        })

    }

    async function buyWorker(e) {

        e.preventDefault();

        await marketplace.methods.buyFromSale(

            minerToBuy

        ).send({

            from: window.ethereum.selectedAddress,
            signatureType: "EIP712_SIGN"

        }).once("receipt", (receipt) => {

            console.log(receipt.transactionHash);

        })

    }

    return (

        <div>

            <button id='connectButton' onClick={e => getAccounts()} >Connect Wallet</button>

            <p>Account: {owner}</p> 

            <form onSubmit={e => sellWorker(e)}>

                <label htmlFor="sellWorker">Sell Worker: </label>
                <input type="text" id="sellWorker" onChange={e => setMinerToSell(e.target.value)} />
                <label htmlFor="setPrice">Set Price: </label>
                <input type="text" id="setPrice" onChange={e => setPrice(e.target.value)} />

                <br />

                <input type="submit" value="Sell Worker" />

            </form>
            

            <br />

            <form onSubmit={e => buyWorker(e)}>

                <label htmlFor="buyWorker">Buy Worker: </label>
                <input type="text" id="buyWorker" onChange={e => setMinerToBuy(e.target.value) } />

                <input type="submit" value="Buy Worker" />

            </form>

        </div>
    )

}

export default Marketplace;