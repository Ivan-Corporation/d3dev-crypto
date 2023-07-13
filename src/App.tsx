import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Chart from "./components/Chart";
import InputData from "./components/InputData";
import { rawData } from "./data/test";
import TableData from "./components/TableData";
import { RepositoryMetrics } from "repository-metrics";

function App() {
  const [cryptoData, setCryptoData] = useState(rawData);
  return (
    <>
      <header>
        <nav className="px-4 lg:px-6 py-2.5 bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center">
              <img
                src="https://github.com/Ivan-Corporation/Ivan-Corporation/blob/main/profile.png?raw=true"
                className="mr-3 h-6 sm:h-9"
                alt="Koma Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                d3dev
              </span>
            </a>
          </div>
        </nav>
      </header>
      <div className="App">
        <div className="flex justify-between">
          <div className="w-full lg:w-2/4">
            <InputData cryptoData={cryptoData} setCryptoData={setCryptoData} />
          </div>
          <div className="mt-6 lg:block hidden">
            <RepositoryMetrics
              owner="Ivan-Corporation"
              repo="d3dev-crypto"
              theme="dark"
            />
          </div>
        </div>
        {cryptoData.data.length === 0 ? (
          "Chart data not found 📈"
        ) : (
          <Chart cryptoData={cryptoData} />
        )}
        <div className="">
          {cryptoData.data.length === 0 ? (
            "Table data not found 🪙"
          ) : (
            <TableData cryptoData={cryptoData} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
