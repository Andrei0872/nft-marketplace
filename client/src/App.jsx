import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { web3 } from './config/web3';

function App() {
  useEffect(() => {
    const fetchFn = async () => {
      Promise.resolve()
        .then(async () => {
          const accounts = await web3.eth.getAccounts();
          console.log(accounts);
        })
    };

    fetchFn();
  }, []);
  
  return (
    <h1>Hello World!</h1>
  )
}

export default App
