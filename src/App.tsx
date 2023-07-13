import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Chart from "./components/Chart";
import InputData from "./components/InputData";
import { rawData } from "./data/test";

function App() {
  const [cryptoData, setCryptoData] = useState(rawData);
  console.log(cryptoData);
  return (
    <div className="App">
      <div className=" w-1/3">
        <InputData cryptoData={cryptoData} setCryptoData={setCryptoData} />
      </div>
      <Chart cryptoData={cryptoData} />
    </div>
  );
}

export default App;
