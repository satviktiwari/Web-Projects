import './App.css';
import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Coin from './coins'

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
    })
    .catch(error => console.log(error));
  })

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const filterCoins = coins.filter(coins =>
    coins.name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="App">
      <div className='search'>
        <h1>Search</h1>
        <form>
          <input type='text' placeholder='Search' className='inp' onChange={handleChange}/>
        </form>
      </div>
      {filterCoins.map(coins => {
        return<Coin 
          key={coins.id} 
          name={coins.name}
          symbol={coins.symbol}
          volume={coins.market_cap}
          price={coins.current_price}
        />
      })}
    </div>
  );
}

export  default App;
