import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {

    return (

        <div>

            <li>

                <Link to="/KraterAdmin">Krater Admin Panel</Link>

            </li>
            
            <li>

                <Link to="/Alchemy">Alchemy</Link>

            </li>

            <li>

                <Link to="/Marketplace">Marketplace</Link>
            </li>

        </div>
    )
}

export default Navbar;