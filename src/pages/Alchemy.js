import React, { useState} from "react";
import { config } from "../config";

let alchemyEndpoint = "https://polygon-mumbai.g.alchemy.com/v2/ss1lNSLCS0jUBnsNgQ70OatA-u97zn4g";

const Alchemy = () => {

    const fetchNFTs = async (owner, contractAddress, setNFTs, retryAttempt) => {
        if (retryAttempt === 5) {
            return;
        }
        if (owner) {
            let data;
            try {
                if (contractAddress) {
                    data = await fetch(`${alchemyEndpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`).then(data => data.json())
                } else {
                    data = await fetch(`${alchemyEndpoint}/getNFTs?owner=${owner}`).then(data => data.json())
                }
            } catch (e) {
                fetchNFTs(alchemyEndpoint, owner, contractAddress, setNFTs, retryAttempt+1)
            }
    
            setNFTs(data.ownedNfts)
            return data
        }
    }
    
    const [owner, setOwner] = useState("")
    const [NFTs, setNFTs] = useState("")
    

    return(

        <div>
            
            <label htmlFor="ownerOfNFTs">Address To Query: </label>
            <input type="text" id="ownerOfNFTs" onChange={e => setOwner(e.target.value)} />

            <button onClick={() => {fetchNFTs(owner, config.contract.address, setNFTs )}}>Reveal NFTs</button>

            <section className='flex flex-wrap justify-center'>
                
                {
                    NFTs ? NFTs.map(NFT => {
                    
                        return (
                           <h1>{NFT.id.tokenId}</h1>
                        )
                    }) : <div>No NFTs found</div>
                }
                
            </section>

        </div>

    );

}

export default Alchemy;