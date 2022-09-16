import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {

    return (

        <div>

            <li>

                <Link to="/">Krater Admin Panel</Link>

            </li>
            
            <li>

                <Link to="/ ">Alchemy</Link>

            </li>

        </div>
    )
}

export default Navbar;