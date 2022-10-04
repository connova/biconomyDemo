import React, { useState} from "react";
import { config } from "../config";

const Marketplace = () => {

    async function sellWorker(e) {

        e.preventDefault();



    }

    async function buyWorker(e) {

        e.preventDefault();


    }

    return (

        <div>
            
            <label htmlFor="sellWorker">Sell Worker: </label>
            <input type="text" id="sellWorker" onChange={e => sellWorker(e.target.value)} />

            <br />

            <label htmlFor="buyWorker">Buy Worker: </label>
            <input type="text" id="buyWorker" onChange={e => buyWorker(e.target.value) } />

        </div>
    )

}

export default Marketplace;