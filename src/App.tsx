import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js"
import KraterAdmin from "./pages/KraterAdmin";
import Alchemy from "./pages/Alchemy";
import Marketplace from "./pages/Marketplace";

function App() {


  return (
    <div className="App">
      Matic Mumbai

        <BrowserRouter>

          <Navbar />

          <Routes>

            <Route path="/KraterAdmin" element={<KraterAdmin />} />
            <Route path="/Alchemy" element={<Alchemy />}  />
            <Route path="/Marketplace" element={<Marketplace />} />

          </Routes>

        </BrowserRouter>

    </div >
  );
}

export default App;
