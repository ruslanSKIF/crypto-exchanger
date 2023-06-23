import React, { useEffect, useState } from 'react';

const CryptoCurrencyRate = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('bitcoin');
  const [rate, setRate] = useState(null);
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencyRate = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${selectedCurrency}&vs_currencies=usd`);
        const data = await response.json();
        const rate = data[selectedCurrency].usd;
        setRate(rate);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCryptocurrencies = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
        const data = await response.json();
        setCryptocurrencies(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies');
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrencyRate();
    fetchCryptocurrencies();
    fetchCurrencies();
  }, [selectedCurrency]);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div>
      <h2>Crypto Currency Rate</h2>
      <p>
        <label htmlFor="currency-select">Select Cryptocurrency: </label>
        <select className='currency-select-list' id="currency-select" value={selectedCurrency} onChange={handleCurrencyChange}>
          {cryptocurrencies.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name}
            </option>
          ))}
        </select>
      </p>
      {rate ? <p>Current rate: ${rate}</p> : <p>Loading rate...</p>}

      <h3>Currencies</h3>
      {currencies.length > 0 ? (
        <ul className='currency-list'>
          {currencies.map((currency) => (
            <li key={currency}>{currency}</li>
          ))}
        </ul>
      ) : (
        <p>Loading currencies...</p>
      )}
    </div>
  );
};

export default CryptoCurrencyRate;
