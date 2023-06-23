import React from "react";
import CryptoCurrencyRate from './CryptoCurrencyRate';

function App() {
  return (
    <div className="wrapper">
      <div className="bg_gif">
        <img src={require("./img/abstractionl.gif")} alt="Abstraction" className="img_gif"/>
      </div>
      <div className="crypto-list-wrapper">
        <CryptoCurrencyRate />
      </div>
    </div>
  );
}

export default App;
